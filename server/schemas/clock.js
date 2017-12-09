var mongoose = require("mongoose");
var Schema = mongoose.Schema;



var ClockSchema = new Schema({
  name:String,              //打卡名称
  img:String,               //打卡封面图
  startTime:String,         //每天打卡的开始时间
  endTime: String,          //每天打卡的结束时间
  startDate:String,         //打卡开始日期
  endDate:String,           //打卡结束日期
  desc:String,              //打卡详细描述,
  username:String,          //创建者
  userImg:String,           
  // owner: {                  //创建人id
  //   type: Schema.Types.ObjectId,
  //   ref: "user"
  // },          
  // participants: [{            //参与者       
  //   type: Schema.Types.ObjectId,
  //   ref: "user"
  // }], 
  createDate:String,              //打卡项目创建日期
});

// ClockSchema.pre("save", function (next) {
//   this.img = this.img ? this.img : "/images/publicHeader.png";
//   next();
// });

module.exports = ClockSchema;