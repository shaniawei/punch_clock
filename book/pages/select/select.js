Page({

  /**
   * 页面的初始数据
   */
  data: {
    mcq:[
      {
        id:'guguo',
        question:'以下那些属于四大文明古国？',
        select:[
          {
            name: '古埃及',
            value:0,
          },
          {
            name: '古罗马',
            value: 1,
          },
          {
            name: '古印度',
            value: 2,
          },
          {
            name: '古巴比伦',
            value: 3,
          }
        ],
        score:20,
        current:'023',
        beenselected: 0
      },
      {
        id:'yuan',
        question: '从猿到人的进化过程可为三个阶段：',
        select: [
          {
            name: '“正在形成中的人”',
            value: 0,
          },
          {
            name: '早期智人',
            value: 1,
          },
          {
            name: '猿人',
            value: 2,
          },
          {
            name: '猿',
            value: 3,
          }
        ],
        score: 20,
        current:'0123',
        beenselected: 0
      }
    ],
    sc:[
      {
        id:'huangdi',
        question: '明朝在位时间最长的皇帝是哪位？',
        select: [
          {
            name: '朱元璋',
            value: 0,
          },
          {
            name: '朱棣',
            value: 1,
          },
          {
            name: '朱翊钧',
            value: 2,
          },
          {
            name: '朱瞻基',
            value: 3,
          }
        ],
        score: 10,
        current:2,
        beenselected: 0
      },
      {
        id:'huoyao',
        question: '火药始用于军事上是在什么时候？',
        select: [
          {
            name: '清朝',
            value: 0,
          },
          {
            name: '西汉',
            value: 1,
          },
          {
            name: '明朝',
            value: 2,
          },
          {
            name: '唐朝末年',
            value: 3,
          }
        ],
        score: 10,
        current: 3,
        beenselected:0
      }
    ],
    totlaScore:0
  },
  applyBtn:function(){
    var _this=this;
    var mcq = this.data.mcq;
    var arr=this.data.sc.concat(mcq);
    _this.data.totlaScore=0;
    for(var i=0;i<arr.length;i++){
      if (arr[i].beenselected == arr[i].current){
        _this.data.totlaScore += arr[i].score
        console.log(_this.data.totlaScore)
      }
    }
    _this.data.totlaScore = _this.data.totlaScore.toString()
    wx.showModal({
      title: '您的总分数是',
      content: _this.data.totlaScore
    })
  },
  radioChange: function (e) {
    var _this = this; //获得page实例
    var id = e.target.id; //获得发生事件的对象
    var len = _this.data.sc.length //获得单选的题量
    for (var i = 0; i < len; i++) {
      if (_this.data.sc[i].id == id) { //找到对应的题目
        _this.data.sc[i].beenselected = e.detail.value; 
      }
    }
    
  },
  checkboxChange:function(e){
    var _this = this;
    var id = e.target.id;
    var len = _this.data.mcq.length
    for (var i = 0; i < len; i++) {
      if (_this.data.mcq[i].id == id) {
        _this.data.mcq[i].beenselected = e.detail.value.sort().join('').toString()
        console.log(_this.data.mcq[i].beenselected)
      }
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