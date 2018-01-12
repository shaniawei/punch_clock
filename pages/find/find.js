// find.js
var app=getApp()
var url=app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    clockInfo:[],
    clockNumMap:{}
  },
  join(e){
    var tar=e.target
    var dataset=tar.dataset
    wx.request({
      url: `${url}/joinClock`,
      method:'POST',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl,
        clockId:dataset.id
      },
      success:function(err,data){
        wx.switchTab({
          url: '../index/index',
        })
      },
      fail:function(){
        wx.showToast({
          title: '加入打卡失败',
          icon: 'fail',
          duration: 1000,
          mask: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var userInfo=app.globalData.userInfo
    wx.request({
      url: `${url}/clockInfo`,
      method: 'POST',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl
      },
      success: function (data) {
        console.log("ClockInfo", data)
        var data = data.data
        that.setData({
          clockInfo: data.clockInfo,
          clockNumMap: data.clockNumMap
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
  }
})