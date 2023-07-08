const createBuilding = require("./createBuilding");
const createMultipleBuildings = require("./createMultipleBuildings");
const getBuilding = require("./getBuilding");
const getBuildings = require("./getBuildings");

module.exports = {
    "/buildings/createBuilding": {
        ...createBuilding
    },
    "/buildings/createMultipleBuildings": {
        ...createMultipleBuildings
    },
    "/buildings": {
       ...getBuildings
    },
    "/buildings/{id}": {
        ...getBuilding
    }
}