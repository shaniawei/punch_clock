var express=require('express')

var app=express()
var PORT=process.env.PORT||8999

app.listen(PORT,function(){
  console.log(`server is running in ${PORT}`)
})

app.use('/test',function(req,res){
  console.log("receive request")
  res.end("1234")
})