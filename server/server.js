var express=require('express')
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var session = require("express-session")

var path=require('path')
var fs=require('fs')
var mongodb = require("./mongoose")

var app=express()
var PORT=process.env.PORT||8999

mongodb.connectToMongoDB();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(session({
  secret: "miaomiao",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  }
}))

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT,function(){
  console.log(`server is running in ${PORT}`)
})

app.use('/test',function(req,res){
  console.log("receive request")
  res.end("1234")
})



var router=fs.readdirSync(path.join(__dirname,'routers'))
router.forEach(path=>{
  app.use('/', require(`./routers/${path}`))
})

var request=require('request')
async function auto(){
    await saveFakeData({
      username: "axin3333333", userImg: "https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
      name: "读书打开，长期有效",
      startTime: "00:00",
      endTime: "23:59",
      startDate: '2018-01-11',
      endDate: '2020-12-25',
      desc: '每天都要读书打卡'
    })
    await saveFakeData({
      username: "gardon33333333",
      userImg: "https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
      name: "晨跑，无效",
      startTime: "07:00",
      endTime: "08:00",
      startDate: '2018-01-11',
      endDate: '2018-02-21',
      desc: '早起晨跑打卡'
    })
}

function saveFakeData(data){
  var promise=new Promise((resolve,reject)=>{
    request.post({ url: `http://127.0.0.1:${PORT}/create`, form:data}, (err, res,body) => {
      if (err) {
        console.log('create fakeData error ', err)
        reject(err)
      } else {
        resolve(body)
        console.log('create fakeData success ', body)
      }
    })
  })
  return promise
}

var argv = process.argv
if (argv.length >= 3) {
  auto()
}