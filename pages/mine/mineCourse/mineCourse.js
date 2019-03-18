const app = getApp();
import { ajax, getLength, cutstr } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    pageIndex: 1,
    pageSize: 5,
    releaseState: 1,
    loadingComplete: false, // 全部加载完成
    showTips: true,
    tips: '正在加载内容……',
  },

  tabChange(e) {
    const releaseState = e.currentTarget.dataset.releaseState;
    const userInfo = app.globalData.userInfo;
    this.setData({
      releaseState,
      pageIndex: 1,
      courseList: [],
      showTips: true,
      tips: '正在加载内容……',
      loadingComplete: false
    },() =>{
      this.getCourseData({
        releaseState,	//发布状态，0 未发布 1，已发布
        userID: userInfo.user_id,	//用户ID，内置的唯一标识。
        pageIndex: 1,	//当前页数，默认从第一页开始。
        pageSize: this.data.pageSize,	//每页显示的记录数。
        callBack: (courseList) => {
          if(courseList.length == 0){
            this.setData({
              courseList,
              pageIndex: 1,
              showTips: true,
              tips: '暂无内容……'
            })
          }else{
            this.setData({
              courseList,
              pageIndex: ++this.data.pageIndex,
              showTips: false
            })
          }
          
        }
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opts) {
    this.setData({
      releaseState: opts.releaseState || 1
    },()=>{
      const userInfo = app.globalData.userInfo;
      this.getCourseData({
        userID: userInfo.user_id,	//用户ID，内置的唯一标识。
        releaseState: this.data.releaseState,	//发布状态，0 未发布 1，已发布
        pageIndex: this.data.pageIndex,	//当前页数，默认从第一页开始。
        pageSize: this.data.pageSize,	//每页显示的记录数。
        callBack: (courseList) => {
          this.setData({
            courseList,
            pageIndex: ++this.data.pageIndex,
            showTips: false
          })
        }
      })
    })
  },
  
  //页面画到底部加载更
  searchScrollLower() {
    //已经加载完全部课程
    if (this.data.loadingComplete) {
      this.setData({
        showTips: true,
        tips: '已经到底了……'
      });
    }else{
      this.setData({
        showTips: true,
        tips: '正在加载更多内容……'
      })
      this.getCourseData({
        releaseState: this.data.releaseState,	//发布状态，0 未发布 1，已发布
        userID: app.globalData.userInfo.user_id,	//用户ID，内置的唯一标识。
        pageIndex: this.data.pageIndex,	//当前页数，默认从第一页开始。
        pageSize: this.data.pageSize,	//每页显示的记录数。
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
      url: '/GetCourseByUserID',
      method: 'get',
      data: {
        releaseState: opts.releaseState,
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