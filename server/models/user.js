var mongoose = require("mongoose");
var UserSchema = require("../schemas/User");
var UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;