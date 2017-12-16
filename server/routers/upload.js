var express = require("express");
var formidable = require('formidable')
var fs=require('fs')
var router = express.Router();

router.post('/imgUpload', function (req, res) {   //图片上传
  var body = req.body
  var uploadPath ='uploadImg'
  var imgName = 'img'        //前端传来的图片的name
  console.log('session:',req.session.user)
  dealMultipartFormData(req, imgName, uploadPath, function (fields, files, newName){
    var url = `/${uploadPath}/${newName}`
    console.log("imgUpload",url)
      res.json({url:url,errCode:0,msg:'ok'})      
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
    var oldPath = files[picName].path;       //这里其实还可以优化，因为没有上传题图的时候，会产生一个0kb的文件
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