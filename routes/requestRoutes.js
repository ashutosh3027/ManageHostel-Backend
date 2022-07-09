const express = require('express');
const requestController = require('./../controller/requestController');
const authController = require('./../controller/authController');
const router  = express.Router();

router.route('/requestUpdates').post(authController.protect, authController.restrictTo('admin'), requestController.updateRequest)
router.route('/').get(requestController.getAllRequests).post(authController.protect, authController.restrictTo('student'),requestController.createRequest)

module.exports = router;