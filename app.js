//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: (res) => {
        if (res.code) {
          //TODO  根据用户code 获取openId 此时根据openId 判断是否已经完成注册，完成注册以后不需要跳转到授权页面；
          const openId = wx.getStorageSync('openId');
          if(openId){
            this.checkRegister(openId)
          }else{
            this.getOpenId({
              code: res.code,
              callBack: (openId) => {
                wx.setStorageSync('openId', openId);
                this.checkRegister(openId)
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
  checkRegister(opts){
    wx.request({ //获取个人的openId
      url: 'https://api.vroec.com/Api/CDSP/CheckUserInfo',
      method: 'get',
      data: {
        openId: opts.openId
      },
      success: (data) => {
        const userInfo = data.data;
        if(userInfo){
          wx.redirectTo({
            url: '/pages/mine/userInfo/userInfo'
          })
        }else{
          wx.redirectTo({
            url: '/pages/login/login'
          })
        }
      }
    })
  },

  // 获取OpenId
  getOpenId(opts){
    wx.request({ //获取个人的openId
      url: 'https://api.vroec.com/Api/CDSP/GetOpenID',
      method: 'get',
      data: {
        code: opts.code
      },
      success: (data) => {
        const openId = data.data;
        opts.callBack(openId);
      }
    })
  },
  
  globalData: {
    user: {
      finish: false,
      userInfo: null
    },
    server: "https://api.vroec.com/"
  }
})