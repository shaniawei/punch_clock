## **预计实现的功能**

1.两个预设的打卡：早起 跑步

2.可创建自定义打卡  定义打卡时间 打卡周期

3.编辑打卡日记 进行打卡


因为没有线上接口，只是在本地跑了node，所以其他的用户登陆不进来，因此需要手动录入一些其他的用户数据
db.clocks.save({
  username:"axin",
  userImg:"https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
  name:"读书",
  startTime : "00:00", 
  endTime : "23:59",
  startDate:'2018-01-11',
  endDate:'2020-12-25',
  desc:'每天都要读书打卡',
  createDate:"2018-01-11 12:50:12"
})
db.clocks.save({
  username:"gardon",
  userImg:"https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
  name:"晨跑",
  startTime : "07:00", 
  endTime : "08:00",
  startDate:'2018-01-11',
  endDate:'2018-02-21',
  desc:'早起晨跑打卡',
  createDate:"2018-01-11 12:50:12"
})

用户打卡表
db.userClocks.save({
   clockId: '5a576d123e53d05e9823204c',
   username:"axin",
   userImg:"https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
   isOwner: true
})
db.userClocks.save({
   clockId: "5a576d183e53d05e9823204d",
   username:"gardon",
   userImg:"https://wx.qlogo.cn/mmopen/vi_32/mNCCyibfZicjaL994ACadhsJlbGLB6JR8p9diaibhiblzwMxXHeHl4oAt6afRYotqG7ibw94LqqZAu0oMfm6SUnTIJQA/0",
   isOwner: true
})