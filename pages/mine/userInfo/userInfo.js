import{ ajax } from '../../../utils/util.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    formData: {
      userNameType: true,
      iphoneType: true,
      schoolType: true,
      collegeType: true,
      userName: '',
      iphone: '',
      school: '',
      college: '',
    }
  },

  //提交表单
  formSubmit(e) {
    var currData = e.detail.value;
    this.setData({
      formData: {
        userNameType: !!currData.userName,
        iphoneType: !!currData.iphone,
        schoolType: !!currData.school,
        collegeType: !!currData.college,
        ...currData
      }
    });
    if (!this.data.formData.userName){
      return false;
    }
    if(!this.data.formData.iphone){
      return false;
    }
    if(!this.data.formData.school){
      return false;
    }
    if(!this.data.formData.college){
        return false;
    }
    app.globalData.userInfo = {
      ...getApp().globalData.userInfo,
      phoneNumber: currData.iphone, //手机号码
      trueName: currData.userName, //真实姓名
      school: currData.school, //学校
      department: currData.college //院系
    }

    this.saveUserInfo(app.globalData.userInfo)
  },

  //显示弹窗
  toShowModal() {
    this.setData({
      showModal: true
    })
  },
  //隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false
    });
  },
  //保存用户信息后返回上一页
  back(){
    this.setData({
      showModal: false
    });
    wx.redirectTo({
      url: '/pages/mine/mine'
    })
  },

  //保存用户信息
  saveUserInfo(opts){
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/SaveUser',
      method: 'post',
      data: {
        ...opts
      },
      success: (data)=>{
        //TODO
        this.setData({
          showModal: true
        })
        wx.setStorage({
          key: 'finish',
          data: true,
        })
        app.globalData.userInfo.userID = data.userID || 12;
      }
    })
  },

  //获取手机号码
  getPhoneNumber(e) {
    ajax({
      url: '/getPhone',
      method: 'post',
      data:{
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      success: (data)=>{
        this.setData({
          iphone: data.iphone
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  }


})