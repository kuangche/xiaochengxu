const app = getApp();
import { ajax, getLength, cutstr } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: null,
    starDisabled: false,
    showNewNum: false,
    title: '',
    html: '',
    starNum: 0,
    time: ''
  },

  edit(){
    wx.redirectTo({
      url: '/pages/publish/publish?courseID=' + this.data.searchData.courseID,
    });
  },

  publish(){
    ajax({
      url: 'https://api.vroec.com/api/cdsp/ReleaseCourse',
      method: 'get',
      data: {
        courseID: this.data.searchData.courseID
      },
      success: (data) => {
        this.setData({
          showModal: true
        });
      }
    })
  },
  getCourseDetail: function (opts = { courseID: '' }) {
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByID',
      method: 'get',
      data: {
        ...opts
      },
      success: (data) => {
        const courseDetail = data.data;
        this.setData({
          courseID: courseDetail.course_id,
          userID: courseDetail.user_id,
          title: courseDetail.course_title,
          html: courseDetail.course_summary,
          starNum: courseDetail.course_praise_num,
          time: courseDetail.course_is_release ? courseDetail.course_release_time : courseDetail.course_create_time
        });
      }
    })
  },
  hideModal() {
    this.setData({
      showModal: false
    });
  },
  toView() {
    this.setData({
      showModal: false,
    },() =>{
      wx.redirectTo({
        url: '/pages/course/course',
      });
    });
  },
  onLoad(opts){
    this.setData({
      searchData: {
        releaseState: opts.releaseState,
        courseID: opts.courseID
      }
    },()=>{
      this.getCourseDetail({
        courseID: opts.courseID
      })
    })
  }
})