//获取应用实例
import { ajax } from '../../utils/util.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: null,
    showModal:false,
    operateType: '',
    courseName: '',
    article: '',
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
  publishCourse() {
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

  getCourseDetail: function () {
    ajax({
      url: 'Api/CDSP/GetTestData',
      //method: 'post',
      success: (data) => {
        this.setData({
          courseName: data.courseName,
          article: data.article
        })
      }
    })
  },

  onLoad(opts){
    this.setData({
      searchData:{
        ...opts
      }
    })

    if(opts){ //编辑某个课程
      ajax({
        url:'',
        method: '',
        data:{},
        success:(data) =>{

        }
      })
    }
  }

})
