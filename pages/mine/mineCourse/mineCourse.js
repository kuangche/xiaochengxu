import { ajax } from '../../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    tab: "left"
  },

  tabChange(e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    ajax({
      url: 'Api/CDSP/GetTestData',
      success: (data) => {
        this.setData({
          courseList: data.data
        })
      }
    })
  },

  searchScrollLower(){
    console.log('loading')
  }

})