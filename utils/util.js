const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}



// 公用的修改画笔宽度
function changeWidth(e, _this, canvasHeight, pageType) {
  let c = {};
  if (pageType === 1) {
    c.canvasHeight = canvasHeight;
  } else {
    c.canvasHeightLen = canvasHeight;
  }
  _this.setData({
    w: e.detail.value,
    eraser: false,
    ...c,
  })
}

function login(){ 
  var that= this 
  var sucess = arguments[0] ? arguments[0] : function(){};//登录成功的回调 
  var fail = arguments[1] ? arguments[1] : function(){};//登录失败的回调 
  var title = arguments[2] ? arguments[2] : '授权登录失败，部分功能将不能使用，是否重新登录？';//当用户取消授权登录时，弹出的确认框文案 
  var user = wx.getStorageSync('user');//登录过后，用户信息会缓存 
  if(!user){ 
    wx.login({ 
      success: function (res) { 
        var code = res.code; 
        wx.getUserInfo({ 
          success: function (res) { 
            var rawData = encodeURIComponent(res.rawData); 
            var signature = res.signature || ''; 
            var encryptedData = res.encryptedData; 
            var iv = res.iv; 
            that.getLoginApi(code, rawData, signature, encryptedData, iv, function (res) {//调用服务器端登录，获得详细用户资料，比如openid(支付用)，保存用户数据到服务器 
              wx.setStorageSync("user",res)//本地缓存user数据 下次打开不需要登录 
              var app = getApp() 
              app.globalData.user = res//在当前的app对象中缓存user数据 
              sucess(res) 
            }) 
          }, 
          fail: function (res) {//用户点了“拒绝” 
            wx.showModal({ 
            title: '提示', 
            content: title, 
            showCancel: true, 
            cancelText: "否", 
            confirmText: "是", 
            success: function (res) { 
              if (res.confirm) { 
                if (wx.openSetting) {//当前微信的版本 ，是否支持openSetting 
                  wx.openSetting({ 
                    success: (res) => { 
                      if (res.authSetting["scope.userInfo"]) {//如果用户重新同意了授权登录 
                        wx.getUserInfo({//跟上面的wx.getUserInfo sucess处理逻辑一样 
                          success: function (res) { 
                            var rawData = encodeURIComponent(res.rawData); 
                            var signature = res.signature || ''; 
                            var encryptedData = res.encryptedData; 
                            var iv = res.iv; 
                            that.getLoginApi(code, rawData, signature, encryptedData, iv, function (res) { 
                              wx.setStorageSync("user",res) 
                              var app = getApp() 
                              app.globalData.user = res 
                              sucess(res) 
                            }) 
                          } 
                        }) 
                      } else {//用户还是拒绝 
                        fail() 
                      } 
                    }, 
                    fail: function () {//调用失败，授权登录不成功 
                      fail() 
                    } 
                  }) 
                } else { 
                  fail() 
                } 
              } 
            } 
          }) 
        } 
        }) 
    }, 
    fail: function (res) { 
      fail() 
    }, 
    }) 
  }else{//如果缓存中已经存在user 那就是已经登录过 
    var app = getApp() 
    app.globalData.user = user 
    sucess(user) 
  } 
}

module.exports = {
  formatTime: formatTime,
  changeWidth: changeWidth,
}
