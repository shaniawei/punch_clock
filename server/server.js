var express=require('express')
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var session = require("express-session")

var mongodb = require("./mongoose")

var index=require('./routers/index')

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

app.listen(PORT,function(){
  console.log(`server is running in ${PORT}`)
})

app.use('/test',function(req,res){
  console.log("receive request")
  res.end("1234")
})

app.use('/',index)