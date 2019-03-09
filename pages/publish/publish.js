//获取应用实例
import { ajax } from '../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    operateType: '',
    courseName: '',
    article: ''
  },


  nameBlue: function(e){
    this.setData({
      courseName: e.detail.value
    })
  },
  articleBlue: function(e){
    this.setData({
      article: e.detail.value
    })
  },

  saveCourse: function(){
      ajax({
        url: 'Api/CDSP/GetTestData',
        //method: 'post',
        data:{
          courseName: this.data.courseName,
          article: this.data.article
        },
        success: ()=> {
          this.setData({
            operateType: '保存',
            showModal: true
          })
        }
      })
  },
  publishCourse: function () {
    ajax({
      url: 'Api/CDSP/GetTestData',
      //method: 'post',
      data: {
        courseName: this.data.courseName,
        article: this.data.article
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
  continue(){
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
  }

})
