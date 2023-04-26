const { promisify } = require("util");
const User = require('./../modals/userModals');
const catchAsync = require('./../utils/catchAsync');
const jwt = require("jsonwebtoken");
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        }
    });
});

const createNewUser = (req, res, next) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not define'
    });
}
const getUserProfile = (req, res) => {
    return res.status(200).json({
        status: 'success',
        user:req.user
    });

}
const getUserById = catchAsync(async (req, res) => {
    let id;
    if (req.params.id) {
        id = req.params.id;
    }
    const token = (req.cookies.jwt || req.headers.authorization).split(' ')[1];
    if (token) {
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        id = decoded.id;
    }
    const user = await User.findById(id);

    res.status(200).json({
        status: 'success',
        user
    });
})

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not define'
    });
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not define'
    });
}

module.exports = { getAllUsers, getUserById, createNewUser, updateUser, deleteUser,getUserProfile  };