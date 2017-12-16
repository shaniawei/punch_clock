//index.js
//获取应用实例
const app = getApp()
const url =app.globalData.url
var isLoaded=false
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
    console.log('22222222222')
    isLoaded=true
    if (app.globalData.userInfo) {
      console.log(555555555555)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getClockInfo()
    }  else {
      console.log(66666666)
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
  onShow(){
      if(!isLoaded){
        this.getClockInfo()
      }
  },
  onHide(){
      isLoaded=false       //下一次进入首页要重新拉起用户信息,因为有可能是从create_clock来的，这个时候index页面是不会重新onLoad的
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
  },
  clock(e){
    var tar=e.target
    var data=tar.dataset
    console.log(555555555555,data,tar)
    if(data.status==2){   //可以跳转至打卡页面
      wx.navigateTo({
        url:`../clock/clock?id=${data.id}`
      })
    }
  },
  test(){

  }
})
