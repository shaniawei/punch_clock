var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();

router.post('/dailyInfo', function (req, res) {   //获取所有的打卡日记信息,diary
  var body = req.body
  console.log("dailyInfo,session",req.session)
  console.log("dailyInfo,cookie", req.cookie)
  console.log("dailyInfo,param", req.param)
  UserClockModel.find({ username: body.username , userImg: body.userImg }).populate(["clockId"]).exec(function (err, items) {
    if (err) {
      console.log('ERROR')
      return
    }
    console.log("dailyInfo", items)
    items = items || []
    var dailyInfo=[]
    items.forEach(function (item) {
      // item.clockId._doc.clockStatus = 1
      if (item.signDate && item.signDate.length && item.daily && item.daily.length){
        dailyInfo.push(item)
      }
    })
    res.json({ dailyInfo: dailyInfo,  errCode: 0, msg: 'ok' })
  })
})


module.exports = router