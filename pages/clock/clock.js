// clock.js
'use strict';
let choose_year = null,
  choose_month = null;

var app=getApp();
const url = app.globalData.url

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    clockInfo:''
  },
  showRule:function(){
    wx.showModal({
      title: '打卡规则',
      content: '-2017-11-15-2017-12-01 共计2天\n-每天 任意时段\n-必须发布日记打卡才能生效\n-以上打卡规则解释权归打卡创建者所有',
      showCancel:false,
      confirmText:'关闭'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("OPTIONS",options)
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    });
    this.tapDayItem();
    this.getSingleClockInfo(options.id)
  },
  getSingleClockInfo(clockId) {
    var that = this
    var userInfo = app.globalData.userInfo
    wx.request({
      url: `${url}/singleClockInfo`,
      method: 'GET',
      data: {
        username: userInfo.nickName,
        userImg: userInfo.avatarUrl,
        clockId:clockId
      },
      success: function (data) {
        console.log("SingleClockInfo", data)
        var data = data.data
        that.setData({
          clockInfo: data
        })
      }
    })
  },
  tapDayItem() {
    const idx = new Date().getDate()-1;
    const days = this.data.days;
    days[idx].choosed = !days[idx].choosed;
    this.setData({
      days,
    });
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false
      });
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
    }

    this.setData(o);
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