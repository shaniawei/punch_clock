// clock.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateArray:[13,14,15,16,17,18,19]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //判断 当日是周几,以此显示页面的缩小版日历
    var day=new Date().getDay();
    var date=new Date().getDate();
    if (day == 1) {
      for (day; day <= day + 6; day++) {
        this.data.dateArray.push(date + day - 1)
      }
    }else if(day==7){
      for(day;day>=1;day--){
        this.data.dateArray.push(date-day+1)
      }
    }else{
      for(day;day>=1;day--){
        this.data.dateArray.push(date - day + 1)
      }
      day = new Date().getDay()-1;
      for(day;day<6;day++){
        this.data.dateArray.push(date + day - 1)
      }
    }
    console.log(this.data.dateArray);

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