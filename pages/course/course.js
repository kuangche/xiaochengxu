//获取应用实例
import {
  ajax
} from '../../utils/util.js';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading:false,  //正在加载
    loadingComplete: false, // 全部加载完成
    courseList: null,
    orderType: "star",
    orderBy: 'desc',

    tab: "left",
    starOrder: "desc", // asc 升序； desc 降序
    starType: 1, //0 为选中状态，1选中状态  
    timeOrder: "desc",
    timeType: 0,

    navData: [{
      name: "课程", //文本
      current: 1, //是否是当前页，0不是  1是
      style: 0, //样式
      iconPath: "kecheng", //不同图标
      fn: 'gotoCourse' //对应处理函数
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
    }, ]
  },

  tabChange: function(e) {
    var currTab = e.currentTarget.dataset.tab;
    if(this.data.starType == 1 && currTab == 'left'){
      if (this.data.starOrder == 'desc'){
        this.setData({
          starOrder: 'asc'
        })
      }else{
        this.setData({
          starOrder: 'desc'
        })
      }
    }
    if (this.data.timeType == 1 && currTab == 'right') {
      if (this.data.timeOrder == 'desc') {
        this.setData({
          timeOrder: 'asc'
        })
      } else {
        this.setData({
          timeOrder: 'desc'
        })
      }
    }

    this.setData({
      starType: currTab == 'left' ? 1 : 0,
      timeType: currTab == 'right' ? 1 : 0,
      tab: currTab,
      orderType: currTab == 'left' ? "star" : "time",
      orderBy: currTab == 'left' ? this.data.starOrder : this.data.timeOrder
    })

    //请求课程数据
    this.getCourseData({
      orderType: this.data.orderType,
      orderBy: this.data.orderBy
    });
  },

  gotoCourse: function() {
    wx.redirectTo({
      url: '/pages/course/course',
    });
  },
  gotoPublish: function() {
    wx.navigateTo({
      url: '/pages/publish/publish',
    });
  },
  gotoMine: function() {
    wx.redirectTo({
      url: '/pages/mine/mine',
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCourseData({
      orderType: this.data.orderType,
      orderBy: this.data.orderBy
    });
  },
  
  getCourseData(opts){
    ajax({
      url: 'Api/CDSP/GetTestData',
      // method: 'post',
      data: {
        ...opts
      },
      success: (data) => {
        this.setData({
          courseList: null
        });
        setTimeout(()=>{
          this.setData({
            courseList: data.data
          });
        })
      }
    })
  },
  searchScrollLower(){
    this.setData({
      isLoading: true
    })
    ajax({
      url: 'Api/CDSP/GetTestData',
      // method: 'post',
      success: (data) => {
        this.setData({
          courseList: this.data.courseList.concat(data.data)
        });
      }
    })
  }
})