const { promisify } = require("util");
const User = require('./../modals/userModals');
const College = require('./../modals/collegeModals')
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
        user: req.user
    });

}
const getUserById = catchAsync(async (req, res) => {
    console.log(req)
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
const updateUserCollege = catchAsync(async (req, res, next) => {
    const { collegeName } = req.body;

    // Check if collegeName is provided
    if (!collegeName) {
        return res.status(400).json({ error: 'College name is required' });
    }


    // Find the college based on the provided name
    const college = await College.findOne({ collegeName: { $regex: new RegExp(collegeName, 'i') } });
    if (!college) {
        return res.status(404).json({ error: 'College not found' });
    }

    // Update the user's collegeId based on the found college
    const user = await User.findByIdAndUpdate(req.user.id, { collegeId: college._id }, { new: true });
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User college updated successfully', user });
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

module.exports = { getAllUsers, getUserById, createNewUser, updateUser, deleteUser, getUserProfile, updateUserCollege };