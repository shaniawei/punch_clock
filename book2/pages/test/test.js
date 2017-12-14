const wxParser = require('../../wxParser/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CategoryID:'',
    chapterList:[],
    detail:{}
  },
  //获取CategoryID类里的内容列表
  getChapter: function (id) {
    let categoryID = id;
    let objects = { categoryID };
    wx.BaaS.getContentList(objects).then((res) => {
      // success
      this.setData({
        chapterList: res.data.objects
      });
      this.getDetail(this.data.chapterList[0].id,0)
    }, (err) => {
      // err
    });
  },
  //获取内容详情
  getDetail:function(id,index){
    var that=this;
    let richTextID = id;
    let objects = { richTextID };
    wx.BaaS.getContent(objects).then((res) => {
      // success
      console.log(res.data)
      this.setData({
        detail:{
          title:res.data.title,
          content:res.data.content,
          index:index+1
        }
      })
      //渲染富文本
      wxParser.parse({
        bind: 'richText',
        html: that.data.detail.content,
        target: that
      });
    }, (err) => {
      // err
    });
  },
  //获取下一章
  getNextChapter:function(e){
    var nowIndex = e.currentTarget.dataset.index;  //现在看的是第几章
    var nextIndex = nowIndex + 1
    if (nextIndex >= this.data.chapterList.length){
      wx.showToast({
        title: '没有下一章',
        icon: '',
        duration: 2000
      })
    }else{
      var nextRichTextID = this.data.chapterList[nextIndex].id;
      this.getDetail(nextRichTextID, nextIndex);
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
    
  },
  //获取上一章
  getPreChapter: function (e) {
    var nowIndex = e.currentTarget.dataset.index;  //现在看的是第几章
    var preIndex = nowIndex - 1
    if (preIndex < 0){
      wx.showToast({
        title: '没有上一章',
        icon: '',
        duration: 2000
      })
    }else{
      var nextRichTextID = this.data.chapterList[preIndex].id;
      this.getDetail(nextRichTextID, preIndex)
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      CategoryID: options.CategoryID
    })
    this.getChapter(this.data.CategoryID)
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