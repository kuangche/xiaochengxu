const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:'',
    courseList: null,
    loadingComplete: false,
    isLoading: false,
    pageIndex:1,	//当前页数，默认从第一页开始。
    pageSize:5	//每页显示的记录数。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        userID: getApp().globalData.userInfo.user_id
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
        const TotalNum = data.data.TotalNum;
        const courseList = data.data.Datas;
        setTimeout(() => {
          this.setData({
            pageIndex: ++this.data.pageIndex,
            courseList: courseList,
            loadingComplete: TotalNum == courseList.length
          });
        })
      }
    })
  },
  searchScrollLower() {
    //已经加载完全部课程
    if (this.data.loadingComplete) return;
    this.setData({
      isLoading: true
    })
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetPraiseCourseByUserID',
      method: 'get',
      data: {
        userID: this.data.userID,
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize
      },
      success: (data) => {
        const TotalNum = data.data.TotalNum;
        const courseList = this.data.courseList.concat(data.data.Datas);
        this.setData({
          pageIndex: ++this.data.pageIndex,
          courseList: courseList,
          loadingComplete: TotalNum == courseList.length,
          isLoading: false
        });
      }
    })
  }
})