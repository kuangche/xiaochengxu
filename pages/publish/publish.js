//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseID: null,
    showModal: false,
    operateType: '',
    courseName: '',
    article: '',
    articleType: '',
    courseNameType: '',
    nameFocus: '',
    articleFocus: ''
  },

  nameBlur(){
    this.setData({
      nameFocus: ''
    })
  },
  nameFocus(){
    this.setData({
      nameFocus: 'focuse'
    })
  },
  articleBlur() {
    this.setData({
      articleFocus: ''
    })
  },
  articleFocus() {
    this.setData({
      articleFocus: 'focuse'
    })
  },

  nameBlue(e){
    this.setData({
      courseName: e.detail.value
    })
  },
  articleBlue(e){
    this.setData({
      article: e.detail.value
    })
  },

  saveCourse(){
    let state = true;
    if (!this.data.courseName) {
      this.setData({
        courseNameType: 'error'
      });
      state = false;
    }
    if (!this.data.article) {
      this.setData({
        articleType: 'error'
      });
      state = false;
    }
    if (!state) return;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/SaveCourse',
      method: 'post',
      data:{
        course_id: this.data.searchData.courseID || 0,
        user_id: getApp().globalData.userInfo.user_id,
        course_title: this.data.courseName,
        course_summary: this.data.article,
        course_is_release: 0 //是否发布（0，未发布 1，已发布） 如果是直接发布就给1
      },
      success: ()=> {
        this.setData({
          operateType: '保存',
          showModal: true
        })
      }
    })
  },
  publishCourse() {
    let state = true;
    if (!this.data.courseName) {
      this.setData({
        courseNameType: 'error'
      });
      state = false;
    }
    if (!this.data.article) {
      this.setData({
        articleType: 'error'
      });
      state = false;
    }
    if(!state)return;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/SaveCourse',
      method: 'post',
      data: {
        course_id: this.data.searchData.courseID || 0,
        user_id: getApp().globalData.userInfo.user_id,
        course_title: this.data.courseName,
        course_summary: this.data.article,
        course_is_release: 1 //是否发布（0，未发布 1，已发布） 如果是直接发布就给1
      },
      success: ()=> {
        this.setData({
          operateType: '发布',
          showModal: true
        })
      }
    })
  },
  hideModal() {
    this.setData({
      showModal: false,
      operateType: '',
    });
  },
  continuePub(){
    this.setData({
      showModal: false,
      operateType: '',
      courseName: '',
      article: ''
    });
  },
  toView() {
    this.setData({
      showModal: false,
      operateType: '',
      courseName: '',
      article: ''
    });
    wx.navigateTo({
      url: "/pages/mine/mineCourse/mineCourse",
    });
  },

  getCourseDetail: function (courseID) {
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByID',
      method: 'get',
      data:{
        courseID
      },
      success: (data) => {
        this.setData({
          courseName: data.data.course_title,
          article: data.data.course_summary
        })
      }
    })
  },

  onLoad(opts){
    this.setData({
      searchData:{
        courseID: opts.courseID
      }
    })
    if (opts.courseID){ //编辑某个课程
      this.getCourseDetail(opts.courseID)
    }
  }

})
