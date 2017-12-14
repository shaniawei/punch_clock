//app.js
App({
  onLaunch: function () {
    //引入SDK
    require('./sdk-v1.1.1.js')
    // 初始化 SDK
    let clientID = '07109ed66fb97d68e879'
    wx.BaaS.init(clientID)
  }
})