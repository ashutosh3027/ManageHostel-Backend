const express = require('express');
const roomController = require('./../controller/roomController');
const authController = require('./../controller/authController');
const router = express.Router();
const {getAllRooms,createNewRoom,getRoomById,updateRoom, deleteRoom,createMuiltipleNewRoom,getRoomsByBuildingId, deleteRoomById}= roomController

/**
 * This route is a red flag please modify it ones development is done.
 */
router.route('/deleteRooms').delete(authController.protect,authController.restrictTo('admin'), deleteRoom)
router.route('/').get(authController.protect, getAllRooms).post(authController.protect,authController.restrictTo('admin'),createMuiltipleNewRoom);
router.route('/:id').get(getRoomById).patch(updateRoom).delete(authController.protect,authController.restrictTo('admin'),deleteRoomById);
router.route('/getRoomsByBuildingId/:buildingId').get(authController.protect,getRoomsByBuildingId);
router.route('/book-room').post(authController.protect,roomController.bookRoom);
router.route('/vacant-room/:roomId').post(authController.protect,roomController.vacantRoom);
router.route('/vacant-rooms/:buildingId').post(authController.protect, authController.restrictTo(['admin']), roomController.vacantRooms);


module.exports = router;