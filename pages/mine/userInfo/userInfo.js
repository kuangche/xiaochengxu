// pages/mine/userInfo/usrInfo.js
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
      collegeType: true
    }
  },
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
    this.setData({
      showModal:true
    })
  },
  toShowModal(e) {
    this.setData({
      showModal: true
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    });
  },
  back(){
    this.setData({
      showModal: false
    });
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})