var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();

router.post('/joinClock', function (req, res) {   //加入某个打卡项目，find
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

router.get('/singleClockInfo',function(req,res){   //获取当个打卡项目的信息，clock
  var body=req.body
  UserClockModel.find({
    clockId: body.clockId, 
    username: body.username,
    userImg: body.userImg}).populate('clockId').exec(function(err,data){
      if(err){
        console.log(err)
        res.json({ errCode: -1, msg: 'ok' })
        return
      }
      data.signDate=data.signDate||[]
      res.json({ errCode: 0, msg: 'ok' ,clockInfo:data})
    })
})

router.post('/clocking', function (req, res) {   //打卡，diary
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