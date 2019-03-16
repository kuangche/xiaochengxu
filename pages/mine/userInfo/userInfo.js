Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    const currData = e.detail.value;
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
    if (!this.data.formData.phone || !/^[1][3,8]\d{9}/.test(this.data.formData.phone)){
      this.setData({
        formData:{
          ...this.data.formData,
          phoneType: false,
          phone:''
        }
      })
      return false;
    }
    if(!this.data.formData.school){
      return false;
    }
    if(!this.data.formData.college){
        return false;
    }
    getApp().globalData.userInfo = {
      ...getApp().globalData.userInfo,
      phoneNumber: currData.phone, //手机号码
      trueName: currData.userName, //真实姓名
      school: currData.school, //学校
      department: currData.college //院系
    }

    this.saveUserInfo(getApp().globalData.userInfo)
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
    const openID = baseUserInfo.openID;
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
        getApp().globalData.isLogin = true;
        getApp().globalData.userInfo.userID = data.data;
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
        sessionKey: getApp().globalData.sessionKey,
        iv: e.detail.iv,
        encryptedData: e.detail.encryptedData
      },
      success: (data)=>{
        getApp().globalData.getPhoneBtn = false;
        const purePhoneNumber = data.data.purePhoneNumber;
        if (/^[1][3,8]\d{9}/.test(purePhoneNumber)){
          this.setData({
            phone: purePhoneNumber,
            getPhoneBtn: false
          })
          this.setData({
            formData: {
              ...this.data.formData,
              phone: purePhoneNumber
            }
          });
        }else{
          wx.showModal({
            title: '提示',
            content: data.data,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opts) {
    this.setData({
      getPhoneBtn: getApp().globalData.getPhoneBtn,
    });
    //如果从个人中心页面进来，则需要获取前一页的数据，把相关内容回显到此页面当中；
    if (opts.editor && opts.editor == 1){
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];  //上一个页面
      const userInfo = getApp().globalData.userInfo; //取上页data里的数据也可以修
      this.setData({
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