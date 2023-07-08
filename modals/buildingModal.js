const mongoose = require("mongoose");
const College = require('./collegeModals');
const buildingSchema = new mongoose.Schema({
  buildingName: {
    type: String,
    require: [true, "A building must have name!!"]
  },
  collegeId: {
    type: mongoose.Schema.ObjectId,
    ref: 'College',
    required: [true, 'Request must belong to a college']
  }


},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });
buildingSchema.virtual('college', {
  ref: 'College',
  localField: 'collegeId',
  foreignField: '_id',
  justOne: true
})
// this will populate
buildingSchema.pre(/^find/, function (next) {
  this.populate({ path: 'college' });
  next();
})
const Building = mongoose.model("Building", buildingSchema);
module.exports = Building;