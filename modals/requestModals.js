const mongoose = require("mongoose");
const User = require("./userModals");
const Room = require("./roomModals");
const Building = require("./buildingModal");
const College = require("./collegeModals");
const requestSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:[true, 'Request must belong to a user'] 
  },
  roomId: {
    type:mongoose.Schema.ObjectId,
    ref:'Room',
    required:[true, 'Request must belong to a room']
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
  },
  requestStatus: { // this is for checking if request is acepted or rejected
    type: Boolean,
    default: false,
  },
  requestActiveStatus:{ // this is to check whether the request is active or not.
    type:Boolean,
    default:true
  }, 
  collegeId:{
    type: mongoose.Schema.ObjectId,
    ref:'College',
    required:[true, 'Request must belong to a college']
  },
  buildingId:{
    type:mongoose.Schema.ObjectId,
    ref:'Building'
  }
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});

 
requestSchema.pre(/^find/, function(next){
  // this.populate({path:'room'}).populate({path:'user'})
  next();
})
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
