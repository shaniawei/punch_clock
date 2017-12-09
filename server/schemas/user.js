var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({      //还是需要单独的一个user表，因为有一个用户中心
  username: String,
  userImg: String
})
module.exports = UserSchema;