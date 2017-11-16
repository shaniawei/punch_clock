// create_clock.js

const year=new Date().getFullYear();
const month=new Date().getMonth();
const date=new Date().getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLimitTime:true,
    isLimitDate:true,
    startTime:"08:00",
    endTime:"10:00",
    startDate:year+"-"+month+"-"+date,
    endDate: year + "-" + month + "-" + parseInt(date+1)
  },
  //打卡时间 打卡项目持续时间判断
  radioChange:function(e){
    if(e.detail.value==1){
      this.setData({
        isLimitTime:false
      })
    } else if (e.detail.value == 0){
      this.setData({
        isLimitTime: true
      })
    }
    if (e.detail.value == 3) {
      this.setData({
        isLimitDate: false
      })
    } else if (e.detail.value == 2) {
      this.setData({
        isLimitDate: true
      })
    }
  },
  //日期选择器
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var id = e.currentTarget.dataset.id;
    if (id == 'START') {
      this.setData({
        startDate: e.detail.value
      })
    } else if (id == 'END') {
      this.setData({
        endDate: e.detail.value
      })
    }
  },
  //时间选择器
  bindTimeChange: function (e) {
    var id = e.currentTarget.dataset.id;
    if(id=='START'){
      this.setData({
        startTime: e.detail.value
      })
    }else if(id=='END'){
      this.setData({
        endTime: e.detail.value
      })
    }
    
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