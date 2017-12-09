var express = require("express");
var ClockModel = require("../models/clock");
var router = express.Router();

router.post('/baseInfo',function(req,res){   //获取一个用户的打卡信息
  ArticleModel.find({}, function (err, docs) {
    var articles = [];
    var tags = "";
    docs.forEach(function (doc) {
      if (doc.title.indexOf(searchStr) > -1) {
        articles.push(doc);
      }
    });
    tags = util.tagsSort(docs, searchStr);
    UserModel.find({}, function (err, ) {
      var authors = [];
      users.forEach(function (user) {
        if (user.username.indexOf(searchStr) > -1) {
          authors.push(user);
        }
      });
      res.json({ tags: tags, authors: authors, articles: articles });
    });
  });

  ClockModel.find({},function(err,clocks){
    if(err){
      console.log('get clock info error')
      return
    }
    var username=req.body.username
    var mangedClock=[]      //该用户管理的打卡
    var attClock=[]         //该用户参加的打卡
    clocks.forEach(function(clock){
      
    })
  })

})

router.post('/create',function(req,res){    //创建一个新的打卡
  var body=req.body
  var clock=new ClockModel({
    name: body.name,              //打卡名称
    startTime: body.startTime,         //每天打卡的开始时间
    endTime: body.endTIme,          //每天打卡的结束时间
    startDate: body.startDate,         //打卡开始日期
    endDate: body.endDate,           //打卡结束日期
    desc: body.desc,              //打卡详细描述
    owner: body.owner,           //创建人id
    participants: [],  //参与者
    createDate: new Date()              //打卡项目创建日期
  })
  clock.save(function(err){
    if(err){
      console.log('create new clock fail')
      res.json({ err: -1, msg: 'error' })
      return
    }
    console.log('create new clock success')
    res.json({err:0,msg:'ok'})
  })
})


module.exports=router