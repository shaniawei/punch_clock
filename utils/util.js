var app=getApp()
var url=app.globalData.url

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function imgUpload(cb, options) {
  wx.chooseImage({
    count: options.size||1, // 默认9
    success: function (res) {
      // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      upload(tempFilePaths, cb, options);
    }
  })
}
function upload(path, cb, options) {
  wx.showToast({
    icon: "loading",
    title: "正在上传"
  })
  wx.uploadFile({
    url: `${url}/imgUpload`,
    filePath: path[0],
    name: options.name||'img',
    header: { "Content-Type": "multipart/form-data" },
    success: function (res) {
      console.log(res);
      if (res.statusCode != 200) {
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
        cb(err)
      } else {
        console.log(res.data, res.data.url)
        cb && cb(null, res.data)
      }
    },
    fail: function (e) {
      console.log(e);
      wx.showModal({
        title: '提示',
        content: '上传失败',
        showCancel: false
      })
      cb(err)
    },
    complete: function () {
      wx.hideToast();  //隐藏Toast
    }
  })
}

module.exports = {
  formatTime: formatTime,
  imgUpload: imgUpload
}
