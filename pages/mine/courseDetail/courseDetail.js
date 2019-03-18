const app = getApp();
import { ajax, getLength, cutstr } from '../../../utils/util.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starDisabled: false,
    showNewNum: false,
    title: '',
    html: '',
    starNum: 0,
    time: '',
    starData:[]
  },

  edit(){
    wx.redirectTo({
      url: '/pages/publish/publish?courseID=' + this.data.courseID,
    });
  },

  publish(){
    ajax({
      url: '/ReleaseCourse',
      method: 'get',
      data: {
        courseID: this.data.courseID
      },
      success: (data) => {
        this.setData({
          showModal: true
        });
      }
    })
  },
  getCourseDetail: function (opts = { courseID: '' }) {
    ajax({
      url: '/GetCourseByID',
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
      ...opts
    },()=>{
      this.getCourseDetail({
        courseID: opts.courseID
      });
      this.getStarData({
        courseID: opts.courseID
      })
    })
  },
  getStarData(opts) {
    ajax({
      url: '/GetPraiseDetailByCourseID',
      method: 'get',
      data: {
        courseID: opts.courseID
      },
      success: (data) => {
        this.setData({
          starData: data.data
        })
      }
    })
  },
})