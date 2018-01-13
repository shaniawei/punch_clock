// create_clock.js
const app = getApp()
const year=new Date().getFullYear();
const month=new Date().getMonth()+1;
const date=new Date().getDate();
const url=app.globalData.url
const interval=1000
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLimitTime:true,
    isLimitDate:true,
    name:"",
    desc:"",
    startTime:"08:00",
    endTime:"10:00",
    startDate:year+"-"+month+"-"+date,
    endDate: year + "-" + month + "-" + parseInt(date+1),
    isShowToast:false,
    toastTips:"",
    isNameFocus:true,
    isDescFocus:false,
    isTimeReady:false,
    isDateReady:false
  },
  //打卡时间 打卡项目持续时间段判断
  timeRadioChange:function(e){
    var isLimitTime = e.detail.value == 1?false:true
    this.setData({
      isLimitTime: isLimitTime
    })
    this.data.isTimeReady = true
  },
  //打卡周期 打卡项目持续周期判断
  dateRadioChange:function(e){
    var isLimitDate = e.detail.value == 3?false:true
    this.setData({
      isLimitDate: isLimitDate
    })
    this.data.isDateReady = true
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
  onNameBlur:function(e){
    this.setData({
      name:e.detail.value
    })
  },
  onDescBlur: function (e) {
    this.setData({
      desc: e.detail.value
    })
    // this.onTextBlur(e.detail.value,'desc','简介不能为空')
  },
  onTextBlur: function (value,key,tips) {
    var that = this
    if (!value) {
      that.toast(tips)
      that.setData({
        isNameFocus: true
      })
      return
    }
    var data={}
    data[key]=value
    that.setData(data)
  },
  create:function(){
    console.log("create")
    var that=this;
    var data=this.data
    var userInfo=app.globalData.userInfo
    var req={}
    if(!data.name){
      that.toast("打卡项目名称不能为空")
      return
    }
    if(!data.desc){
      that.toast('打卡项目描述不能为空')
      return
    }
    if(!data.isTimeReady){
      that.toast("打卡时间不能为空")
      return
    }
    if(!data.isDateReady){
      that.toast("打卡日期不能为空")
      return
    }
    if(data.isLimitTime){
      req.startTime="00:00"
      req.endTime="23:59"
    }else{
      req.startTime=data.startTime
      req.endTime = data.endTime
    }
    if(data.isLimitDate){
      req.startDate = `${year}-${month}-${date}`
      req.endDate="2020-12-25"
    }else{
      req.startDate=data.startDate
      req.endDate=data.endDate
    }
    req.name=data.name
    req.desc=data.desc
    req.username = userInfo.nickName
    req.userImg = userInfo.avatarUrl
    console.log(req)
    wx.request({
      url: `${url}/create`,
      method: 'POST',
      data: req,
      success: function (data) {
        console.log('CREATE SUCCESS',data)
        // wx.navigateTo({           //这个跳转方式是跳转到应用内的页面
        //   url: '../index/index'
        // })
        wx.switchTab({
          url: '../index/index',
        })
      }
    })
  },
  toast:function(tips){
    var that=this;
    var timer
    this.setData({
      isShowToast: true,
      toastTips: tips
    })
    clearTimeout(timer)
    timer=setTimeout(function () {
      that.setData({
        isShowToast: false
      })
    }, interval)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {       //options里面存放的是QUERY信息
    
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