const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    navData: [
      {
        name: "课程",  //文本
        current: 0,    //是否是当前页，0不是  1是
        style: 0,     //样式
        iconPath: "kecheng", //不同图标
        fn: 'gotoCourse'   //对应处理函数
      }, {
        name: "发布",
        current: 1,
        style: 1,
        iconPath: 'chuangjian',
        fn: 'gotoPublish'
      }, {
        name: "我的",
        current: 1,
        style: 0,
        iconPath: "wode",
        fn: 'gotoMine'
      },
    ]
  },
  //跳转到课程页面
  gotoCourse() {
    wx.redirectTo({
      url: '/pages/course/course',
    });
  },
  //跳转到发布页面
  gotoPublish() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    });
  },
  //跳转到个人中心页面
  gotoMine() {
    wx.redirectTo({
      url: '/pages/mine/mine',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.request({
      url:'https://api.vroec.com/api/cdsp/GetUserByID',
      method: 'get',
      data: {
        userID: getApp().globalData.userInfo.user_id
      },
      success: (data)=>{
        const newData = data.data;
        this.setData({
          userInfo : data.data
        })
        getApp().globalData.userInfo = {
          ...getApp().globalData.userInfo,
          ...data.data
        }
      }
    })
  }
})
