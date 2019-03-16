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


function ajax(options){
  var isLogin = getApp().globalData.isLogin;//登录过后，用户信息会缓存
  if (!isLogin) {
    wx.redirectTo({
      url: '/pages/login/login'
    })
  } else {
    wx.request({
      ...options,
      url: getApp().globalData.server + options.url
    })
  }
}

module.exports = {
  ajax,
  formatTime: formatTime
}
