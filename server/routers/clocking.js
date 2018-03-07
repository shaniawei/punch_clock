var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var utils=require('../utils/utils')
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
  console.log('singleClockInfo:',body)
  UserClockModel.find({
    clockId: body.clockId, 
    username: body.username,
    userImg: body.userImg}).populate('clockId').exec(function(err,data){
      if(err){
        console.log(err)
        res.json({ errCode: -1, msg: 'ok' })
        return
      }
      console.log('singleClockInfo',data)
      data.signDate=data.signDate||[]
      res.json({ errCode: 0, msg: 'ok' ,clockInfo:data[0]})
    })
})

router.post('/clocking', function (req, res) {   //打卡，diary
  var body = req.body
  var now = new Date()
  var _year = now.getFullYear()
  var _month = now.getMonth() + 1
  var _day = now.getDate()
  UserClockModel.find({
    clockId: body.clockId,
    username: body.username,
    userImg: body.userImg
  }).populate('clockId').exec(function(err,items){
    if(err){
      console.log(err)
      res.json({errCode:1000,msg:'get data error'})
      return
    }
    var item=items[0]
    var start = +new Date(`${_year}-${_month}-${_day} ${item.clockId.startTime}`)     //今天的打卡开始时间
    var end = +new Date(`${_year}-${_month}-${_day} ${item.clockId.endTime}`)         //今天的打卡结束时间
    if(+now<+start){
      res.json({errCode:1001,msg:'打卡未开始',})
      return
    }else if(+now>end){
      res.json({ errCode: 1002, msg: '不在打卡时间内', })
      return
    }
    var currStr = utils.formateDate(+now)
    console.log("打卡参数：", body)
    UserClockModel.update({
      clockId: body.clockId,
      username: body.username,
      userImg: body.userImg
    }, { '$push': { 'signDate': currStr, 'daily': body.daily } }).exec((err) => {
      console.log('打卡成功')
      res.json({ errCode: 0, msg: 'ok' })
    });
  })
})

module.exports = router