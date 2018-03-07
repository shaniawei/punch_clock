var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();

router.post('/clockInfo', function (req, res) {   //获取所有的打卡信息,find
  var body = req.body
  console.log('body',body)
  // var name ="Alair1"
  // var img =""
  // username: { $ne: name || body.username }, 
  // userImg: { $ne: img || body.userImg }
  UserClockModel.find({}).populate(["clockId"]).exec(function (err, items) {
    if (err) {
      console.log('ERROR')
      return
    }
    items = items || []
    var clockInfo=[]
    var clockNumMap={}
    var _id
    items.forEach(function (item) {
      console.log(item,111111)
      if(item.isOwner&&(item.username!==body.username||item.userImg!=body.userImg)){  //非当前用户
        clockInfo.push(item)
       }
    })
    console.log('clockInfo',clockInfo)
    clockInfo.forEach(clock=>{          //获得每个打卡项目的参与人数
      _id = clock.clockId._id
      items.forEach(item=>{
        if(item.clockId._id==_id){
          clockNumMap[_id]=clockNumMap[_id]||0
          clockNumMap[_id]++        
        }
      })
    })
    res.json({ clockInfo: clockInfo, clockNumMap: clockNumMap, errCode: 0, msg: 'ok' })
  })
})


module.exports = router