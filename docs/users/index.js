const login = require("./login");
const signup = require("./signup");
const getProfile = require("./get-profile");
const forgetPassword = require("./forgetPassword");
const resetPassword = require("./reset-password");
const updatePassword = require("./updatePassword");
const getUsers = require("./getUsers");
const getUser = require("./getUser");
const updateUser = require("./updateUser");
const deleteUser = require("./deleteUser");
module.exports = {
    "/users/login": {
      ...login,
    },
    "/users/signup": {
      ...signup
    },
    "/users/profile": {
      ...getProfile
    },
    "/users/forgotPassword": {
      ...forgetPassword
    },
    "/users/resetPassword/{token}": {
      ...resetPassword
    },
    "/users/updateMyPassword": {
      ...updatePassword
    },
    "/users": {
      ...getUsers
    },
    "/users/{id}": {
      ...getUser,
      ...updateUser,
      ...deleteUser
    },
  };
  