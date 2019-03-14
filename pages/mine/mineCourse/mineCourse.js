const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    releaseState: 1,
    pageIndex: 1,
    pageSize: 5,
    loadingComplete: false, // 全部加载完成
    isLoading: false
  },

  tabChange(e) {
    const releaseState = e.currentTarget.dataset.releaseState;
    const userInfo = getApp().globalData.userInfo;
    this.setData({
      releaseState,
      pageIndex: 1
    });
    this.getCourseList({
      releaseState,	//发布状态，0 未发布 1，已发布
      userID: userInfo.user_id,	//用户ID，内置的唯一标识。
      pageIndex: 1,	//当前页数，默认从第一页开始。
      pageSize: this.data.pageSize,	//每页显示的记录数。
    })

    
  },
  getCourseList(data){
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByUserID',
      method: 'get',
      data,
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

  searchScrollLower() {
    //已经加载完全部课程
    if (this.data.loadingComplete) return;
    this.setData({
      isLoading: true
    })
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByUserID',
      method: 'get',
      data: {
        releaseState: this.data.releaseState,	//发布状态，0 未发布 1，已发布
        userID: getApp().globalData.userInfo.user_id,	//用户ID，内置的唯一标识。
        pageIndex: this.data.pageIndex,	//当前页数，默认从第一页开始。
        pageSize: this.data.pageSize,	//每页显示的记录数。
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