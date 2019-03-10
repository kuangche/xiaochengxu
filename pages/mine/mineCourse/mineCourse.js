import { ajax } from '../../../utils/util.js';
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    tab: "left",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  tabChange: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
  },
  bindGetUserInfo: function (e) {
    debugger;
    var that = this;
    if (e.detail.userInfo) {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.login({
        success: res => {
          console.log(res.code, e.detail.iv, e.detail.encryptedData)
          wx.request({
            //后台接口地址
            url: '',
            data: {
              code: res.code,
              iv: e.detail.iv,
              encryptedData: e.detail.encryptedData,
            },
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log('请求成功')
            }
          })
        }
      })
    } else {
      console.log(333, '执行到这里，说明拒绝了授权')
      wx.showToast({
        title: "为了您更好的体验,请先同意授权",
        icon: 'none',
        duration: 2000
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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