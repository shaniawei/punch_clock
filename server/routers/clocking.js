var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();

router.post('/joinClock', function (req, res) {   //打卡，如果用户是第一次打开，那么是save，否则就是更新
  var body = req.body
  var UserClock = new UserClockModel({
    clockId: body.clockId,
    username: body.username,
    userImg: body.userImg,
    signDate:[],
    daily:[],
    isOwner: false
  })
  UserClock.save(err => {
    console.log("加入打卡成功")
    res.json({ errCode: 0, msg: 'ok' })
  })
})

router.post('/clocking', function (req, res) {   //打卡
  var body = req.body
  var curr = +new Date()
  var currStr = "" + curr
  UserClockModel.update({           
    clockId: body.clockId,
    username: body.username,
    userImg: body.userImg
  }, { '$push': { 'signDate': currStr, 'daily': body.daily } }).exec((err) => {
    console.log('打卡成功')
    res.json({ errCode: 0, msg: 'ok' })
  });
})

module.exports = router