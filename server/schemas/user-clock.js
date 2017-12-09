var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ClockModel = require("../models/clock");
var UserModel = require("../models/user");

var UserClockSchema=new Schema({
  clockId:{
    type: Schema.Types.ObjectId,
    ref:'clock'
  },
  username:String,
  userImg:String,
  signDate: [String],        //打卡日期列表，由于数组类型的数据存储到数据库后在取出来没有length属性，所以不要这样存储了,用+号分隔
  daily:[String],           //打卡日记列表
  isOwner:Boolean
})

module.exports = UserClockSchema