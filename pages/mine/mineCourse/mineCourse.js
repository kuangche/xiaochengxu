const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    releaseState: 1,
    pageIndex: 1,
    pageSize: 20,
    totalNum: 0
  },

  tabChange(e) {
    const releaseState = e.currentTarget.dataset.releaseState;
    const userInfo = getApp().globalData.userInfo;
    this.setData({
      releaseState,
      pageIndex: 1
    },()=>{
      this.getCourseList({
        releaseState,	//发布状态，0 未发布 1，已发布
        userID: userInfo.user_id,	//用户ID，内置的唯一标识。
        pageIndex: this.data.pageIndex,	//当前页数，默认从第一页开始。
        pageSize: this.data.pageSize,	//每页显示的记录数。
      })
    })
    
  },
  getCourseList(data){
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByUserID',
      method: 'get',
      data,
      success: (data) => {
        this.setData({
          courseList: data.data.Datas,
          totalNum: data.data.TotalNum
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = getApp().globalData.userInfo;
    this.getCourseList({
      userID: userInfo.user_id,	//用户ID，内置的唯一标识。
      releaseState: this.data.releaseState,	//发布状态，0 未发布 1，已发布
      pageIndex: this.data.pageIndex,	//当前页数，默认从第一页开始。
      pageSize: this.data.pageSize,	//每页显示的记录数。
    })
  },

  searchScrollLower(){
    console.log('loading')
  }

})