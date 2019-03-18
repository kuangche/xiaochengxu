//获取应用实例
const app = getApp();
import { ajax, getLength, cutstr} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: [], //数据列表
    pageIndex: 1, //默认显示第一页
    pageSize: 5, //默认每页20条数据
    sortWay: 1, // 1 按点赞数降序 2 按时间降序
    loadingComplete: false, // 全部加载完成
    isLoading: false,

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
    const data = {
      pageIndex: 1,
      sortWay: e.currentTarget.dataset.sortWay,
    };
    this.setData({
      courseList: [],
      ...data
    },()=>{
      this.getCourseData({
        ...data,
        pageSize: this.data.pageSize,
        callBack: (courseList) => {
          this.setData({
            courseList,
            pageIndex: ++this.data.pageIndex,
          })
        }
      });
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (app.globalData.isLogin){
      this.getCourseData({
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        sortWay: this.data.sortWay,
        callBack: (courseList) => {
          this.setData({
            courseList,
            pageIndex: ++this.data.pageIndex,
          })
        }
      });
    }
  },

  //页面画到底部加载更
  searchScrollLower() {
    //已经加载完全部课程
    if (this.data.loadingComplete) return;
    this.setData({
      isLoading: true
    });
    this.getCourseData({
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      sortWay: this.data.sortWay,
      callBack: (courseList,totalNum) => {
        const newCourseList = this.data.courseList.concat(courseList);
        this.setData({
          isLoading: false,
          courseList: newCourseList,
          pageIndex: ++this.data.pageIndex,
          loadingComplete: totalNum == newCourseList.length
        });
      }
    });
  },

  //请求课程数据
  getCourseData(opts){
    ajax({
      url: '/GetCourseList',
      method: 'get',
      data: {
        pageIndex: opts.pageIndex,
        pageSize: opts.pageSize,
        sortWay: opts.sortWay
      },
      success: (data) => {
        const courseStrLeng = app.globalData.courseStrLeng;
        const TotalNum = data.data.TotalNum;
        const courseList = data.data.Datas;
        courseList.forEach((item,index) =>{
          if (getLength(item.course_summary) > courseStrLeng){
            item.course_summary = cutstr(item.course_summary, courseStrLeng)
          }
        });
        if (opts.callBack && Object.prototype.toString.call(opts.callBack) === '[object Function]') {
          opts.callBack(courseList, TotalNum);
        }
      }
    })
  }
})