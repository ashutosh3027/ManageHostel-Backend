const express = require('express');
const buildingController = require('./../controller/buildingController');
const authController = require('./../controller/authController');
const router  = express.Router();

router.route('/createBuilding').post( buildingController.createBuilding);
router.route('/createMultipleBuildings').post( buildingController.createMultipleBuildings)
router.route('/').get(buildingController.getAllBuildings);
router.route('/:id').get(buildingController.getBuildingById);
module.exports = router;