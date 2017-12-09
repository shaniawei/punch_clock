var mongoose=require("mongoose");
function connectToMongoDB(){
    mongoose.connect("mongodb://127.0.0.1:27017/PunchClock");
    var connect=mongoose.connection;
    connect.on("open",function(){
        console.log("connect to mongodb success");
    });
    connect.on("error",function(err){
    	console.log("error",err)
    	console.log("connect to mongodb error");
    });
}
exports.connectToMongoDB=connectToMongoDB;