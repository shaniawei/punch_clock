//index.js
//获取应用实例
const app = getApp()
const url =app.globalData.url
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    noClockProject:false,
    hasClockProject: false,
    test:"",
    ownerClock:[],     //管理的打卡
    onClock:[],        //参与的打卡
    clockStatus: {
      1: "打卡未开始",
      2: "打卡",
      3: '项目已结束',
      4: '已打卡'
    }
  },
  //获取用户信息
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getClockInfo()
    }  else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getClockInfo()
        }
      })
    }
  },
  getClockInfo(){
    var that = this
    var userInfo=that.data.userInfo
    wx.request({
      url: `${url}/baseInfo`,
      method: 'POST',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl
      },
      success: function (data) {
        console.log("ClockInfo",data)
        var data=data.data
        that.setData({
          ownerClock: data.ownerClock,
          onClock:data.onClock
        })
      }
    })
  }
})
