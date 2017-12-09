var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema=new Schema({      //还是需要单独的一个user表，因为有一个用户中心
  username:String,
  userImg:String,
  daily:String,            //打卡日记
  isClocked:Boolean        //是否打卡
})

var ClockSchema = new Schema({
  name:String,              //打卡名称
  startTime:String,         //每天打卡的开始时间
  endTime: String,          //每天打卡的结束时间
  startDate:String,         //打卡开始日期
  endDate:String,           //打卡结束日期
  desc:String,              //打卡详细描述
  owner:UserSchema,           //创建人id
  participants:[UserSchema],  //参与者
  createDate:{              //打卡项目创建日期
    type: Date, 
    default: new Date()
  }
});

// ClockSchema.pre("save", function (next) {
//   this.img = this.img ? this.img : "/images/publicHeader.png";
//   next();
// });

module.exports = ClockSchema;