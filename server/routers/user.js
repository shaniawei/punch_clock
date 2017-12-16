var express = require("express");
var ClockModel = require("../models/clock");
var UserClockModel = require('../models/user-clock')
var router = express.Router();


//这个想法是，所有的页面都需要传username和userImg给服务端，这样很麻烦，所以想一劳永逸，一般的web网站，在登陆后一般会在session中存放用户登陆
//信息，但是小程序的不行，因为小程序没有cookie这个概念，小程序是storage，没有cookie就没有session，因此这里保存的user信息在下一次请求的时候
//其实是undefined，其实可以先存好用户信息到数据库，然后生成一个id返回给小程序，小程序用storage存储这个id，下一次请求的时候把这个id带上，如果
//有这个id，那么就可以拿出这个用户信息，但是我这里就不搞怎么麻烦了，直接全部都传user信息给后台
router.post('/saveUser', function (req, res) {   
  var body = req.body
  req.session.user={
    username:body.username, 
    userImg: body.userImg
  }
  console.log("saveUser",req.session.user)
  res.json({ errCode: 0, msg: 'ok' })
})


module.exports = router