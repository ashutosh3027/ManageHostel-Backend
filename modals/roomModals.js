const mongoose = require('mongoose');
const User = require('./userModals');
const Request = require('./requestModals');
const Building = require("./buildingModal");
const College = require("./collegeModals");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, 'Please prrovide room number'],
      unique: true
    },
    isAllocated: {
      type: Boolean,
      default: false
    },
    allocatedTo: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [function () { return this.isAllocated }, 'Please provide allocated user information']
    },
    allocatedAt: Date,
    buildingId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Building',
      required: [true, 'Room must belong to any building']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual populate
roomSchema.virtual('requests', {
  ref: 'Request',
  foreignField: 'room',
  localField: '_id',

});
roomSchema.pre(/^find/, function (next) {
  this.populate({ path: 'requests' }).populate({ path: 'allocatedTo' }).populate({ path: 'buildingId' });
  next();
})
const Room = mongoose.model('Room', roomSchema);
module.exports = Room;