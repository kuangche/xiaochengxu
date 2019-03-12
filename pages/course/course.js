//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [], //数据列表

    pageIndex: 1, //默认显示第一页
    pageSize: 20, //默认每页20条数据
    sortWay: 1, // 1 按点赞数降序 2 按时间降序
    loadingComplete: false, // 全部加载完成

    //导航数据
    navData: [{
      name: "课程", //文本
      current: 1, //是否是当前页，0不是  1是
      style: 0, //样式
      iconPath: "kecheng", //不同图标
      fn: 'gotoCourse' //对应处理函数
    }, {
      name: "发布",
      current: 1,
      style: 1,
      iconPath: 'chuangjian',
      fn: 'gotoPublish'
    }, {
      name: "我的",
      current: 0,
      style: 0,
      iconPath: "wode",
      fn: 'gotoMine'
    }]
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

  //切换tab 点赞数、时间
  tabChange(e) {
    this.setData({
      sortWay: e.currentTarget.dataset.sortWay
    });

    //请求课程数据
    this.getCourseData({
      orderType: this.data.orderType,
      orderBy: this.data.orderBy,
      loadingComplete: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if(wx.getStorageSync('finish')){
      this.getCourseData({
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        sortWay: this.data.sortWay
      });
    }
  },
  
  getCourseData(opts){
    wx.request({
      url: '/GetCourseList',
      //url: 'Api/CDSP/GetCourse',
      // method: 'post',
      data: {
        ...opts
      },
      success: (data) => {
        this.setData({
          courseList: null
        });
        setTimeout(()=>{
          this.setData({
            courseList: data.data
          });
        })
      }
    })
  },

  //页面滑动到底部触发该事件
  searchScrollLower(){
    //已经加载完全部课程
    if(this.data.loadingComplete)return;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetTestData',
      // method: 'post',
      data:{
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        sortWay: this.data.sortWay
      },
      success: (data) => {
        this.setData({
          courseList: this.data.courseList.concat(data.data)
        });
      }
    })
  }
})