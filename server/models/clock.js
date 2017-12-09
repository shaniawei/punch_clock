var mongoose = require("mongoose");
var ClockSchema = require("../schemas/clock");
var ClockModel = mongoose.model("clock", ClockSchema);

module.exports = ClockModel;