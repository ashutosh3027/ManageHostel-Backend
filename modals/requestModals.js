const mongoose = require("mongoose");
const User = require("./userModals");
const Room = require("./roomModals");

const requestSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required:[true, 'Request must belong to a user'] 
  },
  room: {
    type:mongoose.Schema.ObjectId,
    ref:'Room',
    required:[true, 'Request must belong to a room']
  },
  requestedAt: {
    type: Date,
    default: Date.now(),
  },
  requestStatus: {
    type: Boolean,
    default: false,
  },
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
