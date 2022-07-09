const Request = require('./../modals/requestModals');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const User = require('../modals/userModals');
const Room = require('../modals/roomModals');

exports.getAllRequests = catchAsync(async(req, res, next)=>{
    const requests = await Request.find();
    // const requests = await Request.find().populate(['user', 'room']);
    res.status(200).json({
        status:'success',
        results:requests.length,
        data:{
            requests
        }
    });
})

exports.createRequest = catchAsync(async(req, res, next)=>{
    const room = await Room.findOne({roomNumber:req.body.roomNumber});
    if(!room){
        return next(new AppError(`Room number ${req.body.roomNumber} not exist.`, 404));
    }
    const requestedUsers = room.requests.map((el)=>el.user.toString());
    if(requestedUsers.includes(req.user.id)){
        return next(new AppError('You have already requested for this room allotment!!', 404));
    }
    const newRequest = await Request.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            request:newRequest
        }
    })
})

exports.updateRequest= catchAsync(async (req, res, next)=>{

    const request = await Request.findById(req.body.id);
    if(!request){
        return next(new AppError('There is no such request!!', 404));
    }
    request.requestStatus = req.body.requestStatus;
    await request.save();
    if(request.requestStatus){
       const user = await User.findById(request.user);
       const room = await Room.findById(request.room);
       user.isRoomAlloted=true;
       user.RoomNumber=room.roomNumber;
       user.roomAllotedAt=Date.now();
       await user.save({validateBeforeSave:false});
       room.isAllocated=true;
       room.allocatedTo=request.user;
       room.allocatedAt = user.roomAllotedAt;
       room.allcoatedBy = req.user.name;
       await room.save({validateBeforeSave:false});
       await Request.deleteMany({user:user.id});
    }
    res.status(200).json({
        status:'success',
        message:`Request ${req.body.status?'accepted':'rejected'} `
    })
});
