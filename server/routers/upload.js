var express = require("express");
var formidable = require('formidable')
var fs=require('fs')
var router = express.Router();

const uploadPathMap={
  'img':'uploadImg'
}

router.post('/imgUpload', function (req, res) {   //图片上传
  var body = req.body
  var imgName = body.imgName||'img'        //前端传来的图片的name
  var uploadPath =uploadPathMap[imgName]
  // res.end('1234')
  dealMultipartFormData(req, imgName, uploadPath, function (fields, files, newName){
    var url = `/${uploadPath}/${newName}`
    console.log("imgUpload",url)
    res.end(JSON.stringify({ url: url, errCode: 0, msg: 'ok' }))   
  })
})


module.exports = router

function dealMultipartFormData(req, picName, pathname, callback) {
  var form = new formidable.IncomingForm();
  //console.log(__dirname); E:\jsnode\Blog\routers  
  var dir = __dirname;
  dir = dir.substring(0, dir.lastIndexOf("\\"));
  form.uploadDir = dir + "\\public\\" + pathname;
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    var oldPath = files[picName].path;       
    var oldName = files[picName].name;
    var date = new Date();
    var dateTime = date.getTime().toString();
    var newName = oldName.substring(0, oldName.lastIndexOf(".")) + dateTime + oldName.substr(oldName.lastIndexOf("."));
    var newPath = oldPath.replace(oldPath.substr(oldPath.lastIndexOf("\\") + 1), newName);
    fs.rename(oldPath, newPath, function () {
      callback(fields, files, newName);
    });
  });
}