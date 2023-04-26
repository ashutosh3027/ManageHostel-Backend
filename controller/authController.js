const { promisify } = require("util");
const User = require("../modals/userModals");
const catchAsync = require("./../utils/catchAsync");
const jwt = require("jsonwebtoken");
const AppError = require("./../utils/AppError");
const sendEmail = require("./../utils/email");
const crypto = require("crypto");
const { find } = require("../modals/userModals");
const { stringify } = require("querystring");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (newUser, statusCode, res) => {
  const token = signToken(newUser._id);
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   maxAge: 60 * 60 * 1000, // 1 hour
  //   secure: true,
  //   SameSite:,
  // };
  if (process.env.NODE_ENV === "production") {
    cookieOptions.secure = true;
  }
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
    secure: true,
    SameSite:false,
  });
  newUser.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    user: newUser,
  });
};
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
  });
  createAndSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password"); // plus before name of field is used to select it if we have defined in modal select:false for that field.

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorect email or password", 401));
  }
  createAndSendToken(user, 200, res);
});

/**********************************Check whether user is logged in or not*********************************/

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log("test:", (req.cookies))
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  //Verification token.

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET); // this jwt.verify is a async function  so it's 3rd arugument is callback function.

  // Check if user still exists.
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to this token no longer exist.", 401)
    );
  }

  // Check if user changed password after the token was issued.

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently chnaged password! Please log in again.", 401)
    );
  }
  req.user = currentUser;
  next();
});

/********************************FOR ADMIN**************************************/

// this is going to be used when we want some resources to be restricted to admin only
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      ); //403 for forbbiden.
    }
    next();
  };
};

//

exports.forgetPassword = async (req, res, next) => {
  // Get user by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }
  // generate random reset token.
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forget your password? Submit a Patch request with your new password and passwordConfirm to: ${resetURL}.\nIf you don't forget your password, please ignore this email!`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email",
    });
  } catch (error) {
    console.log(error);
    user.PasswordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later", 500)
    );
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user with recievd token.
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // check if user exist or token is not expired.
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired.", 400));
  }
  // if all goes well till now then update the password.
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); // While saving we are updating the passwordChangedAt value.

  createAndSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { passwordConfirm, newPassword, newPasswordConfirm } = req.body;
  // We need to get user from collection
  const user = await User.findById(req.user._id).select("+password");
  // Check if the password is correct
  if (!(await user.correctPassword(passwordConfirm, user.password))) {
    return next(new AppError("Please provide a correct password."));
  }
  // If password is correct update the password.
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  // Log user in, send JWT
  createAndSendToken(user, 200, res);
});
