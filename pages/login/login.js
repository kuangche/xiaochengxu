//获取应用实例
const app = getApp()

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  bindGetUserInfo: (e) => {
    if (e.detail.userInfo) { //用户按了允许授权按钮
      app.globalData.baseInfo = e.detail.userInfo;
      wx.redirectTo({
        url: '/pages/mine/userInfo/userInfo'
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      })
      
    }
  }
})