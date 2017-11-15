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
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo)
    }  else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          console.log(app.globalData.userInfo)
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  joinProject:function(){
    wx.switchTab({
      url: '../find/find'
    })
  },
  clockPage:function(){
    wx.navigateTo({
      url: '../clock/clock'
    })
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
