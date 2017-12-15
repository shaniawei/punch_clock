//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: "http://127.0.0.1:8997"
  },
  formateDate:function(time) {
    if(!time) return ''
    time = +time
    var date = new Date(time)
    var month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    var day = date.getDate()
    day = day < 10 ? '0' + day : day
    var hour = date.getHours()
    hour = hour < 10 ? '0' + hour : hour
    var min = date.getMinutes()
    min = min < 10 ? '0' + min : min
    var sec = date.getSeconds()
    sec = sec < 10 ? '0' + sec : sec
    return `${date.getFullYear()}-${month}-${day} ${hour}:${min}:${sec}`
    }
})