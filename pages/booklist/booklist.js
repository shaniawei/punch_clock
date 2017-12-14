Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],
    CategoryIDList:[]
  },
  // 获取书籍列表
  getBookList:function(){
    var that=this;
    let tableID = 3974
    var Product = new wx.BaaS.TableObject(tableID)
    var booklist;
    Product.find().then((res) => {
      //获取数据表的书籍列表 success
      that.setData({
        booklist:res.data.objects
      })
    }, (res) => {
      //error
    }
    )
  },
  //获取内容库CategoryID列表
  getCategoryID:function(){
    // 获取 contentGroupID 为 1513217472619756 内容库详情
    var that=this;
    let contentGroupID = 1513217472619756;
    let objects = { contentGroupID };
    wx.BaaS.getContentGroup(objects).then((res) => {
      // success
      that.setData({
        CategoryIDList:res.data.objects
      })
    }, (err) => {
      // err
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookList();
    this.getCategoryID()
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