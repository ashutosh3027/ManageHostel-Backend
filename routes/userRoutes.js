const express = require("express");
const userController = require("./../controller/userController");
const router = express.Router();
const { getAllUsers, createNewUser, getUserById, updateUser, deleteUser,getUserProfile } =
  userController;
const authController = require("./../controller/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get('/profile',authController.protect, getUserProfile);

router.post("/forgotPassword", authController.forgetPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/updateMyPassword", authController.protect,  authController.updatePassword);
router.patch("/update-college",authController.protect,userController.updateUserCollege)
router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
