Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    messageTitle:'',
    messageType: '',
    starDisabled: false,
    listIndex: '',
    courseID: '',
    userID: '',
    title: '',
    html: '',
    starNum: '',
    time: '',
    school: '',
    userName: ''
  },

  //转发
  onShareAppMessage: function (res) {
    if(res.from == 'button'){
      //TODO
    }
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list
    }
  },

  getCourseDetail: function (opts = { courseID:''}){
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
          userID: getApp().globalData.userInfo.user_id,
          title: courseDetail.course_title,
          html: courseDetail.course_summary,
          starNum: courseDetail.course_praise_num,
          time: courseDetail.course_release_time
        });
      }
    })
  },

  //点赞
  starAdd: function(opts = {}){
    if (this.data.starDisabled)return;
    //设置数据
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/PraiseCourse',
      method: 'get',
      data: {
        userID: this.data.userID,
        courseID: this.data.courseID
      },
      success: (data) => {
        if(data.data == 0){
          this.setData({
            showModal: true,
            messageTitle: '点赞失败',
            messageType: 'shibai'
          });
        }else if (data.data == 1){
          this.setData({
            showModal: true,
            messageTitle: '点赞成功',
            messageType: 'chenggong',
            starNum: data.data,
            starDisabled: true
          }, () => {
            this.modifyStarNum(data.data)
          });
        } else if (data.data == 2) {
          this.setData({
            showModal:true,
            messageTitle: '点赞失败,已经点赞',
            messageType: 'shibai'
          });
        }
      }
    })
  },
  hideModal() {
    this.setData({
      showModal: false,
      operateType: '',
    });
  },
  //修改点赞数据
  modifyStarNum(num){
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];  //上一个页面
    const courseList = prevPage.data.courseList; //取上页data里的数据也可以修
    courseList[this.data.listIndex].course_praise_num = num;
    prevPage.setData({
      courseList
    })
  },

  onLoad(opts){

    //获取详细信息
    this.getCourseDetail({
      courseID: opts.courseID
    })
  }
})