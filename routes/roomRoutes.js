const express = require('express');
const roomController = require('./../controller/roomController');
const authController = require('./../controller/authController');
const router = express.Router();
const {getAllRooms,createNewRoom,getRoomById,updateRoom, deleteRoom, makeRequest}= roomController


router.route('/request/:roomNumber').post(authController.protect, authController.restrictTo('student'), makeRequest);
router.route('/').get(authController.protect, getAllRooms).post(createNewRoom);
router.route('/:id').get(getRoomById).patch(updateRoom).delete(authController.protect,authController.restrictTo('admin'),deleteRoom);



module.exports = router;