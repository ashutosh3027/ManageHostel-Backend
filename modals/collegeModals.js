const mongoose = require('mongoose');
const collegeSchema = new mongoose.Schema({
    collegeName:{
        type:String,
        // require:[true, 'A college must have name!!']
    },

},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});
const College = mongoose.model("College", collegeSchema);
module.exports = College;
