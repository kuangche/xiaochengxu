const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    editor: 0,
    showModal: false,
    getPhoneBtn: false,
    formData: {
      userNameType: true,
      phoneType: true,
      schoolType: true,
      collegeType: true,
      userName: '',
      phone: '',
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
        phoneType: !!currData.phone,
        schoolType: !!currData.school,
        collegeType: !!currData.college,
        ...currData
      }
    });
    if (!this.data.formData.userName){
      return false;
    }
    if(!this.data.formData.phone){
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
      phoneNumber: currData.phone, //手机号码
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
    const baseUserInfo = getApp().globalData.userInfo;
    const openID = wx.getStorageSync('openID');
    const formData = this.data.formData;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/SaveUser',
      method: 'post',
      data: {
        user_open_id: openID,
        user_phone_number: formData.phone,
        user_true_name: formData.userName,
        user_school: formData.school,
        user_department: formData.college,
        user_nick_name: baseUserInfo.user_nick_name,
        user_head_image: baseUserInfo.user_head_image,
        user_sex: baseUserInfo.user_sex,
        user_country: baseUserInfo.user_country,
        user_province: baseUserInfo.user_province,
        user_city: baseUserInfo.user_city,
        user_id: baseUserInfo.user_id
      },
      success: (data)=>{
        //TODO
        this.setData({
          showModal: true
        })
        wx.setStorageSync('finish', 'true')
        app.globalData.userInfo.userID = data.data;
      }
    })
  },

  //获取手机号码
  getPhoneNumber(e) {
    if (!getApp().globalData.getPhoneBtn)return;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetPhoneNumber',
      method: 'get',
      data:{
        code: getApp().globalData.code,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      success: (data)=>{
        getApp().globalData.getPhoneBtn = false;
        this.setData({
          phone: data.data,
          getPhoneBtn: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opts) {
    this.setData({
      getPhoneBtn: getApp().globalData.getPhoneBtn,
    })
    if(opts.editor == 1){
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];  //上一个页面
      const userInfo = getApp().globalData.userInfo; //取上页data里的数据也可以修
      this.setData({
        editor: opts.editor,
        formData: {
          userNameType: true,
          phoneType: true,
          schoolType: true,
          collegeType: true,
          userName: userInfo.user_true_name,
          phone: userInfo.user_phone_number,
          school: userInfo.user_school,
          college: userInfo.user_department,
        }
      })
    }
    
  }


})