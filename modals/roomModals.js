const mongoose = require('mongoose');
const User = require('./userModals');
const Request = require('./requestModals');


const roomSchema = new mongoose.Schema(
    {
      roomNumber:{
          type:String,
          required:[true, 'Please prrovide room number'],
          unique:true
      },
      isAllocated:{
          type:Boolean,
          default:false
      },
      allocatedTo:{
          type:mongoose.Schema.ObjectId,
          ref:'User',
          required:[function(){return this.isAllocated}, 'Please provide allocated user information']
      },
      allocatedAt:Date,
      allcoatedBy:{
          type:String,
          required:[function(){return this.isAllocated}, 'Please provide allocating admin.']
      }
    },
    {
      toJSON:{virtuals:true},
      toObject:{virtuals:true}
    }
); 

// Virtual populate
roomSchema.virtual('requests', {
    ref:'Request',
    foreignField:'room',
    localField:'_id',
    
});
roomSchema.pre(/^find/, function(next){
    this.populate({path:'requests'}).populate({path:'allocatedTo'});
    next();
  })
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
