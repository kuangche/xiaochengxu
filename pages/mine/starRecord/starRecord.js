import {
  ajax
} from '../../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCourseData();
  },

  getCourseData(ots) {
    ajax({
      url: 'Api/CDSP/GetTestData',
      success: (data) => {
        this.setData({
          courseList: null
        });
        setTimeout(() => {
          this.setData({
            courseList: data.data
          });
        })
      }
    })
  },
  searchScrollLower(){
    console.log('loading...')
  }
})