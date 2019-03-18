//获取应用实例
const app = getApp();
import { ajax, getLength, cutstr } from '../../../utils/util.js'
//此页ajax不做登陆校验处理，保证分享后的文章，保证用户不用登陆也可以查看
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
    userName: '',
    startData: []
  },

  //转发
  onShareAppMessage(res){
    if(res.from == 'button'){
      //TODO
    }
    return {
      title: '转发',
      path: '/pages/course/detail/detail?courseID=' + this.data.courseID
    }
  },

  getCourseDetail(opts){
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetCourseByID',
      method: 'get',
      data: {
        courseID: opts.courseID
      },
      success: (data) => {
        const courseDetail = data.data;
        this.setData({
          courseID: courseDetail.course_id,
          userID: app.globalData.userInfo.user_id,
          title: courseDetail.course_title,
          html: courseDetail.course_summary,
          starNum: courseDetail.course_praise_num,
          time: courseDetail.course_release_time
        });
      }
    })
  },

  getStarData(opts){
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetPraiseDetailByCourseID',
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

  //点赞
  starAdd(opts = {}){
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
    courseList[parseInt(this.data.listIndex)].course_praise_num = num;
    prevPage.setData({
      courseList
    })
  },

  onLoad(opts){
    this.setData({
      ...opts
    })
    //获取详细信息
    this.getCourseDetail({
      courseID: opts.courseID
    });
    this.getStarData({
      courseID: opts.courseID
    })
  }
})