const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uerID:'',
    courseList: null,
    pageIndex:1,	//当前页数，默认从第一页开始。
    pageSize:20,	//每页显示的记录数。
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userID = getApp().globalData.userInfo.user_id
    this.setData({
      userID
    },()=>{
      this.getCourseData();
    })
    
  },

  getCourseData() {
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetPraiseCourseByUserID',
      mothod:'get',
      data:{
        userID: this.data.userID,
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize
      },
      success: (data) => {
        this.setData({
          courseList: null
        });
        setTimeout(() => {
          this.setData({
            courseList: data.data.Datas
          });
        })
      }
    })
  },
  searchScrollLower(){
    console.log('loading...')
  }
})