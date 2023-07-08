const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
    collegeName:{
        type:String,
        unique: true
    }

},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
const College = mongoose.model("College", collegeSchema);
module.exports = College;
