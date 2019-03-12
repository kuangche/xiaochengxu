import{ ajax } from '../../../utils/util.js';
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
    this.saveUserInfo({
      userID: null, //用户ID
      userPhone: currData.iphone, //手机号码
      userTrueName: currData.userName, //真实姓名
      userSchool: currData.userSchool, //学校
      userDepartment: currData.colleg //院系
    })
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
    wx.navigateBack({
      delta: 1
    })
  },

  //保存用户信息
  saveUserInfo(opts){
    ajax({
      url: '/SubmitPersonalData',
      method: 'post',
      data: {
        userID:null, //用户ID
        userPhone: null, //手机号码
        userTrueName: null, //真实姓名
        userSchool: null, //学校
        userDepartment: null //院系
      },
      success: (data)=>{
        //TODO
        this.setData({
          showModal: true
        })
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