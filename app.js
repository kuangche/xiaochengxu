//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: (res) => {
        this.globalData.code = res.code;
        if (res.code) {
          //TODO  根据用户code 获取openID 此时根据openID 判断是否已经完成注册，完成注册以后不需要跳转到授权页面；
          this.getOpenID({
            code: res.code,
            callBack: (openID) => {
              this.getUser(openID)
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  },

  //检查用户是否已经注册
  getUser(openID){
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
          this.globalData.isLogin = true;
          this.globalData.baseInfo = {
            nickName: userData.user_nick_name,
            avatarUrl: userData.user_head_image,
            gender: userData.user_sex,
            country: userData.user_country,
            province: userData.user_province,
            city: userData.user_city,
          }
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
      url: 'https://api.vroec.com/api/cdsp/GetCode2Session',
      method: 'get',
      data: {
        code: opts.code
      },
      success: (data) => {
        const wxData = data.data;
        this.globalData.openID = wxData.openid;
        this.globalData.sessionKey = wxData.session_key;
        opts.callBack(wxData.openid);
      }
    })
  },
  
  globalData: {
    code:'',
    openID: '',
    isLogin: false,
    getPhoneBtn: true,
    baseInfo:{},
    userInfo: {},
    server: "https://api.vroec.com/api/cdsp"
  }
})