//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    noClockProject:false,
    hasClockProject: false,
    test:""
  },
  //获取用户信息
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }  else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  test:function(){
    var that=this
    wx.request({
      url: 'http://127.0.0.1:8999/test',
      method: 'GET',
      success: function (data) {
        console.log(data, 'test')
        that.setData({
          test:data.data
        })
      }
    })
  }
})
