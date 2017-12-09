var mongoose = require("mongoose");
var UserClockSchema = require("../schemas/user-clock");
var UserClockModel = mongoose.model("userclock", UserClockSchema);

module.exports = UserClockModel;