const createCollege = require("./createCollege");
const createMuiltipleColleges = require("./createMuiltipleColleges");
const getColleges = require("./getColleges");

module.exports = {
    "/colleges/createCollege": {
        ...createCollege
    },
    "/colleges/createMuiltipleCollege": {
      ...createMuiltipleColleges
    },
    "/colleges": {
      ...getColleges
    },
  };
  