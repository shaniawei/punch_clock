// about_me.js
var app=getApp();
var url=app.globalData.url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dailyInfo:"",
    userInfo:""
  },
  //删除日记
  deleteDiary: function () {
    wx.showModal({
      title: '删除确认',
      content: '确定要删除该日志？删除后不可恢复',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo:app.globalData.userInfo
    })
    this.getDailyInfo()
  },
  getDailyInfo: function () {
    var that = this
    var data = that.data
    var userInfo = data.userInfo
    wx.request({
      url: `${url}/dailyInfo`,
      method: 'POST',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl
      },
      success: function (data) {
        var data = data.data
        console.log('dailyInfo:', data.dailyInfo)
        that.setData({
          dailyInfo: data.dailyInfo
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
  onShareAppMessage: function () {
    
  }
})