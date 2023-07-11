const Building = require('./../modals/buildingModal')
const College = require('./../modals/collegeModals')
const catchAsync = require("./../utils/catchAsync");
const { createNewCollege } = require('./collegeController');
const createAndSendBuilding = async (buildingName, collegeName) => {

    var collegeData=await College.find({ collegeName: { $regex: new RegExp(collegeName, 'i') } });

    if (collegeData.length!==0) {
        collegeData = collegeData[0];
        const newBuilding = await Building.create({ collegeId: collegeData.id, buildingName });
        return newBuilding;
    }
    else {
        // if there is no college with name collegeName
        collegeData = createNewCollege(collegeName);
        const newBuilding = await (await Building.create({ collegeId: collegeData.id, buildingName })).populate('collegeId');
        return newBuilding
    }
}
exports.createBuilding = catchAsync(async (req, res, next) => {
    var { buildingName, collegeName } = req.body;
    collegeName = collegeName.trim();
    buildingName = buildingName.trim();
    if (!collegeName || !buildingName) return res.status(400).json({
        status: "All fields are required!"
    })
    const newBuilding = await createAndSendBuilding(buildingName, collegeName)
    return res.status(200).json({
        status: "success",
        data: newBuilding
    });
})
exports.createMultipleBuildings = catchAsync(async (req, res, next) => {
    var { buildingNames, collegeNames } = req.body;
    const newBuildings=[];
    for(var i=0;i<buildingNames.length;i++) {
        var buildingName = buildingNames[i].trim();
        var collegeName = collegeNames[i].trim();
        const newBuilding = await createAndSendBuilding(buildingName, collegeName);
        newBuildings.push(newBuilding);
    };
    return res.status(200).json({
        status:"success",
        message:"All buildings are created successfully",
        data:newBuildings
    })
})
exports.getAllBuildings = catchAsync(async(req, res, next)=>{
    const data = await Building.find({}, {__v:0, });
    res.status(200).json({
        status:"success",
        data
    })
})
exports.getBuildingById = catchAsync(async( req, res, next)=>{
    const id = req.params.id;
    
    const data = await Building.findById(id);
    return res.status(200).json({
        status:'success',
        data
    })
})  

