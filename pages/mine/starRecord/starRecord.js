const app = getApp();
import { ajax, getLength, cutstr } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID:'',
    courseList: [],

    loadingComplete: false, // 全部加载完成
    showTips: true,
    tips: '正在加载内容……',

    pageIndex: 1,	//当前页数，默认从第一页开始。
    pageSize: 5	//每页显示的记录数。
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userInfo = app.globalData.userInfo
    this.setData({
        userID: userInfo.user_id
    },()=>{
      this.getCourseData({
        userID: this.data.userID,
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        callBack: (courseList) => {
          this.setData({
            courseList,
            pageIndex: ++this.data.pageIndex,
            showTips: false
          })
        }
      });
    })
  },

  //页面画到底部加载更
  searchScrollLower() {
    //已经加载完全部课程
    if (this.data.loadingComplete){
      this.setData({
        showTips: true,
        tips: '已经到底了……'
      });
    }else {
      this.setData({
        showTips: true,
        tips: '正在加载更多内容……'
      });
      this.getCourseData({
        userID: this.data.userID,
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        callBack: (courseList, totalNum) => {
          const newCourseList = this.data.courseList.concat(courseList);
          this.setData({
            showTips: false,
            courseList: newCourseList,
            pageIndex: ++this.data.pageIndex,
            loadingComplete: totalNum == newCourseList.length
          });
        }
      })
    }
  },

  //请求课程数据
  getCourseData(opts) {
    ajax({
      url: '/GetPraiseCourseByUserID',
      method: 'get',
      data: {
        pageIndex: opts.pageIndex,
        pageSize: opts.pageSize,
        userID: opts.userID
      },
      success: (data) => {
        const courseStrLeng = app.globalData.courseStrLeng;
        const TotalNum = data.data.TotalNum;
        const courseList = data.data.Datas;
        courseList.forEach((item, index) => {
          if (getLength(item.course_summary) > courseStrLeng) {
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