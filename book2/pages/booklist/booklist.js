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
      //等书籍列表返回并重置成功后调用
      this.getCategoryIDList()
    }, (res) => {
      //error
    }
    )
  },
  //获取内容库CategoryID列表
  getCategoryIDList:function(){
    // 获取 contentGroupID 为 1513217472619756 内容库详情
    var that=this;
    let contentGroupID = 1513217472619756;
    let objects = { contentGroupID };
    wx.BaaS.getContentGroup(objects).then((res) => {
      // success
      that.setData({
        CategoryIDList:res.data.objects
      })
      //等CategoryID列表返回并重置成功后调用
      this.getCategoryID();
    }, (err) => {
      // err
    });
  },
  //获取书籍对应的CategoryID
  getCategoryID:function(){
    var booklist=this.data.booklist;
    var CategoryIDList = this.data.CategoryIDList;
    for (var i = 0; i < booklist.length;i++){
      for (var j = 0; j < CategoryIDList.length;j++){
        if (booklist[i].bookName == CategoryIDList[j].name){
          booklist[i].CategoryID = CategoryIDList[j].id;
          this.setData({
            booklist: booklist
          })
          break;
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookList();
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