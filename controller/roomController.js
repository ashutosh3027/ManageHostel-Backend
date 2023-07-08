const AppError = require("../utils/AppError");
const Room = require("./../modals/roomModals");
const User = require('./../modals/userModals')
const Building = require("./../modals/buildingModal")
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

/**
 * It will create muiltiple new rooms provided total required rooms and buildingId.
 * 
 */
const createMuiltipleNewRoom = catchAsync(async (req, res, next) => {
  const { buildingId, totalRooms } = req.body;
  // Retrieve the building by its ID
  const building = await Building.findById(buildingId);

  if (!building) {
    return res.status(404).json({ error: 'Building not found' });
  }

  // Get the existing room numbers in the building
  const existingRoomNumbers = await Room.distinct('roomNumber', { buildingId });

  // Create an array to hold the room creation promises
  const roomCreationPromises = [];
  var j = 1;
  for (let i = 1; i <= totalRooms; i++) {
    let roomNumber = `${j}`;

    // Check if the room number already exists
    while (existingRoomNumbers.includes(roomNumber)) {
      j++;
      roomNumber = `${j}`;
    }

    // Create a new room object
    const room = new Room({
      roomNumber,
      buildingId: building._id
    });
    j++;
    // Push the room creation promise to the array
    roomCreationPromises.push(room.save());
  }

  // Wait for all room creation promises to resolve
  await Promise.all(roomCreationPromises);

  res.status(201).json({ message: 'Rooms created successfully' });
})
const getRoomById = catchAsync(async (req, res, next) => {
  const room = await Room.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      room,
    },
  });
});
/**
 * returns all rooms of any building
 * provided buildingId.
 */
const getRoomsByBuildingId = catchAsync(async (req, res, next) => {
  const { buildingId } = req.params;
  // Retrieve all rooms based on buildingId
  const rooms = await Room.find({ buildingId });

  res.status(200).json({ rooms });
})

const updateRoom = (req, res) => {

  res.status(500).json({
    status: "error",
    message: "This route is not define",
  });
};
/**
 * deleteRoom is used to delete all rooms.
 * - It is must use at start of bussiness.
 * - Red flag api not allowed to anyone unless and util it is required.
 */
const deleteRoom = catchAsync(async (req, res) => {
  const data = await Room.deleteMany();
  res.status(200).json({
    status: "sucess",
    message: "All rooms are deleted",
    data
  });
});
const deleteRoomById = catchAsync(async (req, res, next) => {
  res.status(404).json({
    message: "This route is not yet implemented."
  })
})


/**
 * bookRoom is used to book room provided userId, roomNumber, buildingId,
 * - The admin is allowed to book room for any user.
 * - The user is allowed to book room for himself only.
 */
const bookRoom = catchAsync(async (req, res) => {
  const { roomNumber, buildingId, userId } = req.body;
  // Check if all required data is provided
  if (!roomNumber || !buildingId || !userId) {
    return res.status(400).json({ message: 'Please provide roomNumber, buildingId, and userId' });
  }
  // student is not allowed to book room for other user.
  if (req.user.role === 'student') {
    if (req.user.id !== userId) {
      return res.status(401).json({
        staus: "fail",
        message: "You are not allowed to book room for other user"
      })
    }
  }
  // Find the building
  const building = await Building.findById(buildingId);

  // Check if the building exists
  if (!building) {
    return res.status(404).json({ message: 'Building not found' });
  }

  // Find the room
  const room = await Room.findOne({ roomNumber, buildingId });

  // Check if the room exists
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  // Check if the room is already allocated
  if (room.isAllocated) {
    return res.status(400).json({ message: 'Room is already allocated' });
  }

  // Find the user
  let user = await User.findById(userId);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the room's allocation status
  room.isAllocated = true;
  room.allocatedTo = userId;
  room.allocatedAt = new Date();
  // Save the updated room
  await room.save();

  // Update the user data to reflect the room allocation
  user = await User.findByIdAndUpdate(
    userId,
    {
      isRoomAlloted: true,
      RoomNumber: roomNumber,
      roomAllotedAt: new Date(),
      buildingId: buildingId
    },
    { new: true }
  );
  res.status(200).json({
    status: 'success',
    message: 'Room booked successfully',
    data: {
      room,
      user
    }
  });
})
/**
 * vacantRoom is used to vacant one single room provided roomId.
 * - The admin can vacant any users room
 * - The user only allowed to vacant his room only.
 */
const vacantRoom = catchAsync(async (req, res, next) => {
  const { roomId } = req.params;

  // Find the room
  const room = await Room.findById(roomId);

  // Check if the room exists
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }

  // Check if the room is already vacant
  if (!room.isAllocated) {
    return res.status(400).json({ message: 'Room is already vacant' });
  }
  // Check whether current user is allowed to vacant current room.
  if (req.user.role === 'student') {
    if (req.user.id !== room.allocatedTo) {
      return res.status(401).json({
        staus: "fail",
        message: "You are not allowed to vacant room of other users"
      })
    }
  }
  // Find the user allocated to the room
  let user = await User.findById(room.allocatedTo);

  // Check if the user exists
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update the user's room information
  user = await User.findByIdAndUpdate(
    user.id,
    {
      isRoomAlloted: false,
      RoomNumber: null,
      roomAllotedAt: null,
      buildingId: null
    },
    { new: true }
  );

  // Update the room's allocation status
  room.isAllocated = false;
  room.allocatedTo = null;
  room.allocatedAt = null;

  // Save the updated user and room
  await room.save();

  res.status(200).json({
    message: 'Room vacated successfully', 
    data: {
      user,
      room
    }
  });
})


/**
 * vacantRooms is used to empty all rooms of any paticular building.
 * - The task is only allowed to admin.
 */
const vacantRooms = catchAsync(async (req, res, next) => {
  const { buildingId } = req.params;

  // Find all occupied rooms in the building
  const rooms = await Room.find({ buildingId, isAllocated: true });

  // Check if any occupied rooms exist
  if (rooms.length === 0) {
    return res.status(400).json({ message: 'No occupied rooms found in the building' });
  }

  // Get an array of user IDs allocated to the occupied rooms
  const userIds = rooms.map((room) => room.allocatedTo);

  // Find all users allocated to the occupied rooms
  const users = await User.find({ _id: { $in: userIds } });

  // Update each user's room information
  users.forEach((user) => {
    user.isRoomAlloted = false;
    user.RoomNumber = null;
    user.roomAllotedAt = null;
  });

  // Update all occupied rooms' allocation status
  await Room.updateMany({ buildingId, isAllocated: true }, {
    isAllocated: false,
    allocatedTo: null,
    allocatedAt: null
  });

  // Save the updated users
  await Promise.all(users.map((user) => user.save()));

  res.status(200).json({ message: 'All occupied rooms in the building have been vacated' });
})
/**
 * This api is useless now.
 */

// const makeRequest = catchAsync(async (req, res, next) => {
//   const room = await Room.findOne({ roomNumber: req.params.roomNumber });
//   if (!room) {
//     return next(new AppError(`There is no such room with room number ${req.params.roomNumber}`, 404));
//   }
//   if (!room.studentRequests.includes(req.user._id)) {
//     return next(new AppError('More than one request is not allowed!', 405));
//   }
// });




module.exports = {
  getAllRooms,
  getRoomById,
  createNewRoom,
  updateRoom,
  deleteRoom,
  createMuiltipleNewRoom,
  getRoomsByBuildingId,
  bookRoom,
  vacantRoom,
  vacantRooms,
  deleteRoomById
};
