var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var utils = require('../utils/utils')
var router = express.Router();

var PORT = process.env.PORT || 8999
var host="127.0.0.1"

router.post('/baseInfo', function (req, res) {   //获取一个用户的打卡信息,index
  var body = req.body
  console.log('session:',req.session.user)
  UserClockModel.find({ username: body.username, userImg: body.userImg }).populate(["clockId"]).exec(function (err, items) {
    if (err) {
      console.log('ERROR')
      return
    }
    items = items || []
    var ownerClock = []      //拥有的打卡
    var onClock = []         //参与的打卡
    var onClockId = []
    var temp
    items.forEach(function (item) {
      var now = new Date()
      var _year = now.getFullYear()
      var _month = now.getMonth() + 1
      var _day = now.getDate()
      var startDate = new Date(`${item.clockId.startDate} ${item.clockId.startTime}`)
      var endDate = new Date(`${item.clockId.endDate} ${item.clockId.endTime}`)
      if (+now < +startDate) {
        item.clockId._doc.clockStatus = 1
      } else if (+now < +endDate) {
        item.clockId._doc.clockStatus = 2
      } else {
        item.clockId._doc.clockStatus = 3
      }
      if (item.signDate && item.signDate.length && item.clockId._doc.clockStatus == 2) {
        var len = item.singDate.length
        var last = new Date(+item.signDate[len-1])
        var year = last.getFullYear()
        var month = last.getMonth() + 1
        var day = last.getDate()

        if (year == _year && month == _month && day == _day) {    //最后存的打卡日期是今天才来判断是否打卡
          var start = +new Date(`${year}-${month}-${day} ${item.clockId.startTime}`)
          var end = +new Date(`${year}-${month}-${day} ${item.clockId.endTime}`)
          last = +last
          if (last >= start && last <= end) {
            item.clockId._doc.clockStatus = 4      //今天确实是在指定的时间段内打卡了
          }
        }
      }
      //给返回的数组里面的对象添加属性是无效的，属性并不会添加到这个对象上来,
      //比如直接给item.clockId._doc.clockStatus=23,这样你在打印item.clockId对象的时候，是打印不出clockStatus的，但是打印
      //item.clockId._doc.clockStatus又是可以的，为什么呢，因为item.clockId在mongoose里面其实是item.clockId._doc的简写，这个是因为
      //级联查询的原因吧，其实clockId里面包含的东西不仅仅是clockId对应的内容，还包含许多其他的东西，打印出来看看就知道,所以，如果想给
      //级联的对象添加额外的属性，可以显示的加上_doc,例如 item.clockId._doc.name1='mbj'
      if (item.isOwner) {
        ownerClock.push(item.clockId)
      } else {
        onClock.push(item.clockId)
        // onClockId.push(item.clockId._id)
      }
    })
    // if(onClock.length){       //把当前用户参与的打卡项目的创建者找出来,或者采用另一种方式，直接在clock表里面加入创建者的信息
    //   UserClockModel.find({ clockId: { "$in": onClockId }, isOwner: true }).exec(function(err,datas){

    //   })
    // }
    res.json({ onClock: onClock, ownerClock: ownerClock, errCode: 0, msg: 'ok' })
  })
})


router.post('/create', function (req, res) {    //创建一个新的打卡,create_clock
  var body = req.body
  var random = Math.random()
  var num
  if (random < 0.25) {
    num = 0
  } else if (random < 0.5) {
    num = 1
  } else if (random < 0.75) {
    num = 2
  } else {
    num = 3
  }
  var img = `//${host}:${port}/images/pkq${num}.jpg`
  console.log("REQ:", req.body)
  var clock = new ClockModel({
    username: body.username,
    userImg: body.userImg,
    img: img,
    name: body.name,              //打卡名称
    startTime: body.startTime,         //每天打卡的开始时间
    endTime: body.endTime,          //每天打卡的结束时间
    startDate: body.startDate,         //打卡开始日期
    endDate: body.endDate,           //打卡结束日期
    desc: body.desc,              //打卡详细描述
    createDate: utils.formateDate(+new Date())              //打卡项目创建日期
  })
  clock.save(function (err) {
    var userClock = new UserClockModel({
      clockId: clock._id,
      username: body.username,
      userImg: body.userImg,
      isOwner: true
    })
    userClock.save(function (err) {
      res.json({ errCode: 0, msg: 'ok', clock: clock, userClock: userClock })
    })
  })
})


module.exports = router