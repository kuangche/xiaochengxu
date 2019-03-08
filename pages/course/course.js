//获取应用实例
import { ajax } from '../../utils/util.js';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: null,
    showModal:false,
    tab: "left",
    starOrder: "desc", // asc 升序； desc 降序
    starType: 1, //0 为选中状态，1选中状态  
    timeOrder: "desc",
    timeType: 0,
    navData: [
      {
        name: "课程",  //文本
        current: 1,    //是否是当前页，0不是  1是
        style: 0,     //样式
        iconPath: "kecheng", //不同图标
        fn: 'gotoCourse'   //对应处理函数
      }, {
        name: "发布",
        current: 1,
        style: 1,
        iconPath: 'chuangjian',
        fn: 'gotoPublish'
      }, {
        name: "我的",
        current: 0,
        style: 0,
        iconPath: "wode",
        fn: 'gotoMine'
      },
    ]
  },
  tabChange: function(e){
    this.setData({
      starType: e.currentTarget.dataset.tab == 'left' ? 1 : 0,
      timeType: e.currentTarget.dataset.tab == 'right'? 1 : 0,
      tab: e.currentTarget.dataset.tab
    })
  },
  
  starOrderChange: function () {
    var newOrder = this.data.starOrder == 'desc' ? 'asc' : 'desc';
    this.setData({
      starOrder: newOrder,
    })
  },
  timeOrderChange: function () {
    var newOrder = this.data.timeOrder == 'desc' ? 'asc' : 'desc';
    this.setData({
      timeOrder: newOrder,
    })
  },
  gotoCourse: function () {
    wx.redirectTo({
      url: '/pages/course/course',
    });
  },
  gotoPublish: function () {
    wx.redirectTo({
      url: '/pages/publish/publish',
    });
  },
  gotoMine: function () {
    wx.redirectTo({
      url: '/pages/mine/mine',
    });
  },
  //转发
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
      success: function (res) {
        console.log('成功', res)
      }
    }
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax({
        url: 'Api/CDSP/GetTestData',
        success: (data) =>{
          this.setData({
            courseList: data.data
          })
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
