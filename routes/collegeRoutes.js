const express = require('express');
const collegeController = require('./../controller/collegeController');
const authController = require('./../controller/authController');
const { route } = require('./buildingRoutes');
const router  = express.Router();

router.route('/createCollege').post( collegeController.createCollege);
router.route('/createMuiltipleCollege').post( collegeController.createMuiltipleCollege)
router.route('/').get(collegeController.getAllColleges)
router.route('/:collegeId').get(collegeController.getCollege)
router.route('/:collegeId/buildings').get(collegeController.getAllBuildingsByCollegeId);
module.exports = router;