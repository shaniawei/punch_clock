// diary.js

var app = getApp();
var url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    daily: '',
    clockId: '',
    dailyImg:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("Daily options:",options)
    var clockId = options.id
    this.setData({
      clockId: clockId,
      dailyImg:[]
    })
  },

  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onDailyBlur:function(e){
    console.log(e.detail.value,1111111)
    this.setData({
      daily:e.detail.value
    })
  },
  clock: function () {
    var that = this
    var data = that.data
    var userInfo = app.globalData.userInfo
    console.log("userinfo:",userInfo.nickName)
    if(!data.daily){
      wx.showToast({
        title: '日记不能为空',
        image:'../../resources/images/warning.jpg',
        duration: 1000,
        mask: true
      })
      return 
    }
    wx.request({
      url: `${url}/clocking`,
      method: 'POST',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl,
        daily: data.daily,
        clockId: data.clockId
      },
      success: function (data) {
        wx.switchTab({
          url: '../index/index'
        })
      }
    })
  },
  uploadImg: function (e) {
    var that = this
    var dailyImg = that.data.dailyImg
    app.imgUpload(function (err, data) {
      if (!err) {
        console.log('uploadImgData', data)
        dailyImg.push(data.url)
        that.setData({
          dailyImg: dailyImg
        })
      }
    })
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
  onShareAppMessage: function () {

  }
})