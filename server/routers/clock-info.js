var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();

router.post('/clockInfo', function (req, res) {   //获取所有的打卡信息
  var body = req.body
  UserClockModel.find({ username: { $ne: body.username }, userImg: {$ne:body.userImg }}).populate(["clockId"]).exec(function (err, items) {
    if (err) {
      console.log('ERROR')
      return
    }
    console.log("clockInfo", items)
    items = items || []
    var clockInfo=[]
    var clockNumMap={}
    var _id
    items.forEach(function (item) {
      // item.clockId._doc.clockStatus = 1
      if(item.isOwner){
        clockInfo.push(item)
       }
    })
    clockInfo.forEach(clock=>{          //获得每个打卡项目的参与人数
      _id = clock.clockId._id
      items.forEach(item=>{
        if(!item.isCounted&&item.clockId._id==_id){
          clockNumMap[_id]=clockNumMap[_id]||0
          clockNumMap[_id]++   
          item.isCounted=true       
        }
      })
    })
    res.json({ clockInfo: clockInfo, clockNumMap: clockNumMap, errCode: 0, msg: 'ok' })
  })
})


module.exports = router