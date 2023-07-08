const getRooms = require("./getRooms");
const createRoom = require("./createRoom");
const getRoom = require("./getRoom");
const updateRoom = require("./updateRoom");
const deleteRoom = require("./deleteRoom");
const bookRoom = require("./bookRoom");
const getRoomsByBuildingId = require("./getRoomsByBuildingId");
const vacantRoom = require("./vacantRoom");
const vacantRooms = require("./vacantRooms");
module.exports = {
    "/rooms": {
      ...getRooms,
      ...createRoom
    },
    "/rooms/{id}": {
      ...getRoom,
      ...updateRoom,
      ...deleteRoom
    },
    "/rooms/getRoomsByBuildingId/{buildingId}": {
    ...getRoomsByBuildingId
    },
    "/rooms/book-room": {
      ...bookRoom
    },
    "/rooms/vacant-room/{roomId}": {
     ...vacantRoom
    },
    "/rooms/vacant-rooms/{buildingId}": {
      ...vacantRooms
    }
  }
  