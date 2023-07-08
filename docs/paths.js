const rooms = require("./rooms")
const users= require("./users")
const buildings = require("./buildings")
const colleges = require("./colleges")
module.exports={
    paths:{
        ...users,
        ...rooms,
        ...buildings,
        ...colleges
    }
}