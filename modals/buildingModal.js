const mongoose = require("mongoose");
const buildingSchema = new mongoose.Schema({
    buildingName:{
        type:String,
        require:[true, "A building must have name!!"]
    }
},
{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})
const Building = mongoose.model("Building", buildingSchema);
module.exports= Building;