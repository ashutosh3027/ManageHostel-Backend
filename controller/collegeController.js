const College = require('./../modals/collegeModals')
const catchAsync = require('./../utils/catchAsync')
const createNewCollege = async(collegeName) => {
    const words = collegeName.trim().split(" ");
    collegeName = words.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
    const newCollege = await College.create({
        collegeName
    })
    return newCollege;
}
const createCollege = catchAsync(async (req, res, next) => {
    var { collegeName } = req.body;
    collegeName = collegeName.trim();
    if (!collegeName) return res.status(400).json({
        status: 'Bad Request',
        message: "College name is empty!! Please give a vaild name"
    });
    const college = await College.find({ collegeName: { $regex: new RegExp(collegeName, 'i') } });
    console.log(college)
    if (college.length!==0) {
        return res.status(400).json({
            status: 'Bad Request',
            message: "College already exist!!"
        })
    }
    const newCollege = await createNewCollege(collegeName);
    return res.status(200).json({
        status:"success",
        college:newCollege
    })
})

const createMuiltipleCollege = catchAsync(async(req, res, next)=>{
    const {collegeNames} = req.body;
    var newColleges = [];
    for(var i=0;i<collegeNames.length;i++) {
        var collegeName = collegeNames[i].trim();
        const college = await College.find({ collegeName: { $regex: new RegExp(collegeName, 'i') } });
        console.log(college, college.length===0)
        if (college.length===0) {
            const newCollege = await createNewCollege(collegeName);
            newColleges.push(newCollege);
            count++;
        }
    };
    return res.status(200).json({
        status:"success",
        college:newColleges
    })

})
const getAllColleges = catchAsync(async (req, res, next)=>{
    const colleges = await College.find({}, {__v:0})
    return res.status(200).json({
        status:"success",
        colleges
    })
})
module.exports = {createNewCollege,createCollege,createMuiltipleCollege,getAllColleges }