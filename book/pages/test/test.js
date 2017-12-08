Page({

  /**
   * 页面的初始数据
   */
  data: {
    filepath:''
  },
  openfile:function(){
    var _this=this;
    wx.downloadFile({
      url: 'http://luozyiii.github.io/blog/images/1.doc',
      success: function (res) {
        console.log(res)
        _this.filePath = res.tempFilePath
        wx.openDocument({
          filePath: _this.filePath,
          fileType:'doc',
          success: function (res) {
            console.log('打开文档成功')
            console.log(res)
          }
        })
      },
      fail: function (err) {
        console.log(err)
      },
      complete:function(res){
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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