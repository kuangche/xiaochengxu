Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    getPhoneBtn: false,
    
    userNameType: true,
    phoneType: true,
    schoolType: true,
    collegeType: true,

    userName: '',
    phone: '',
    school: '',
    college: '',
  },

  //提交表单
  formSubmit(e) {
    const currData = e.detail.value;
    let state = true;
    this.setData({
      userNameType: !!currData.userName,
      phoneType: !!currData.phone,
      schoolType: !!currData.school,
      collegeType: !!currData.college,

      ...currData
    });
    if (!this.data.userName){
      state = false;
    }
    if (!this.data.phone || !/^[1][3,8]\d{9}/.test(this.data.phone)){
      this.setData({
        phoneType: false,
        phone: ''
      })
      state = false;
    }
    if(!this.data.school){
      state = false;
    }
    if(!this.data.college){
      state = false;
    }
    if(state){
      this.saveUserInfo()
    }
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
  saveUserInfo(){
    const globalData = getApp().globalData;
    const baseInfo = globalData.baseInfo;
    const userInfo = globalData.userInfo;
    const openID = globalData.openID;
    const formData = this.data;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/SaveUser',
      method: 'post',
      data: {
        user_open_id: openID,

        user_phone_number: formData.phone,
        user_true_name: formData.userName,
        user_school: formData.school,
        user_department: formData.college,

        user_nick_name: baseInfo.nickName,
        user_head_image: baseInfo.avatarUrl,
        user_sex: baseInfo.gender,
        user_country: baseInfo.country,
        user_province: baseInfo.province,
        user_city: baseInfo.city,
        user_id: globalData.isLogin ? userInfo.user_id : 0
      },
      success: (data)=>{
        this.setData({
          showModal: true
        })
        getApp().globalData.isLogin = true;
        getApp().globalData.userInfo.user_id = data.data;
      }
    })
  },

  //获取手机号码
  getPhoneNumber(e) {
    const dataDetail = e.detail;
    if (!getApp().globalData.getPhoneBtn && dataDetail)return;
    wx.request({
      url: 'https://api.vroec.com/api/cdsp/GetPhoneNumber',
      method: 'get',
      data:{
        sessionKey: getApp().globalData.sessionKey,
        iv: dataDetail.iv,
        encryptedData: dataDetail.encryptedData
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
      const userInfo = getApp().globalData.userInfo; //取上页data里的数据也可以修
      this.setData({
        userNameType: true,
        phoneType: true,
        schoolType: true,
        collegeType: true,
        userName: userInfo.user_true_name,
        phone: userInfo.user_phone_number,
        school: userInfo.user_school,
        college: userInfo.user_department,
      })
    }
  }


})