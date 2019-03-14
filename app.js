//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: (res) => {
        if (res.code) {
          //TODO  根据用户code 获取openID 此时根据openID 判断是否已经完成注册，完成注册以后不需要跳转到授权页面；
          this.globalData.code = res.code;
          const openID = wx.getStorageSync('openID');
          if (openID) {
            this.checkRegister(openID)
          } else {
            this.getOpenID({
              code: res.code,
              callBack: (openID) => {
                this.checkRegister(openID)
              }
            })
          }
          
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  //检查用户是否已经注册
  checkRegister(openID){
    wx.request({ //获取个人的openID
      url: 'https://api.vroec.com/api/cdsp/GetUserByOpenID',
      method: 'get',
      data: {
        openID
      },
      success: (data) => {
        const userData = data.data;
        if (userData){
          this.globalData.userInfo = userData;
          wx.setStorageSync('finish', 'ture');
          //此时非首次登陆系统，或者可能删掉小程序后亦或者清除缓存后 再次进入
          wx.redirectTo({
            url: '/pages/course/course'
          })
        }else{
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  // 获取openID
  getOpenID(opts){
    wx.request({ //获取个人的openId
      url: 'https://api.vroec.com/api/cdsp/GetOpenID',
      method: 'get',
      data: {
        code: opts.code
      },
      success: (data) => {
        const openID = data.data;
        wx.setStorageSync('openID', openID);
        this.globalData.userInfo.openID = openID
        opts.callBack(openID);
      }
    })
  },
  
  globalData: {
    code:'',
    userInfo: {
      openID: '',//微信小程序用户唯一识别
      userID: 0,//用户内置ID （如果是注册，默认为0）
      phoneNumber: '',//手机号码
      trueName: '',//真实姓名
      school: '',//学校
      department: '',//院系

      nickName: '',//昵称
      headImage: '',//头像
      sex: '',//性别
      country: '',//国家
      province: '',//省份
      city: ''//城市
    },
    server: "https://api.vroec.com/api/cdsp"
  }
})