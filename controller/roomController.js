const AppError = require("../utils/AppError");
const Room = require("./../modals/roomModals");
const catchAsync = require("./../utils/catchAsync");
const getAllRooms = catchAsync(async (req, res, next) => {
  const rooms = await Room.find();
  res.status(200).json({
    status: "success",
    results: rooms.length,
    data: {
      rooms,
    },
  });
});
const createNewRoom = catchAsync(async (req, res, next) => {
  const newRoom = await Room.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      room: newRoom,
    },
  });
});

const getRoomById = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});

const updateRoom = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not define",
  });
};

const deleteRoom = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not define",
  });
};
const makeRequest = catchAsync(async (req, res, next) => {
  const room = await Room.findOne({ roomNumber: req.params.roomNumber });
  if(!room){
    return next(new AppError(`There is no such room with room number ${req.params.roomNumber}`, 404));
  }
  if(!room.studentRequests.includes(req.user._id)){
    return next(new AppError('More than one request is not allowed!', 405));
  }

   

});
module.exports = {
  getAllRooms,
  getRoomById,
  createNewRoom,
  updateRoom,
  deleteRoom,
  makeRequest,
};
