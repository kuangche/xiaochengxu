// pages/course/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    html: `属性：nodes 类型：Array / String 结点列表 / HTML String
全局支持class和style属性，不支持id属性。
    结点类型：type = node ， name 标签名 String 是 支持部分受信任的HTML结点，  attrs 属性 Object 否 支持部分受信任的属性，遵循Pascal命名法 ，  children 子结点列表 Array 否 结构和nodes一致
结点类型：type = text  ，text 文本 String 是 支持entities
nodes 不推荐使用 String 类型，性能会有所下降
rich - text 组件内屏蔽所有结点的事件。
    attrs 属性不支持 id ，支持 class 。
    name 属性大小写不敏感。
    如果使用了不受信任的HTML结点，该结点及其所有子结点将会被移除。
    img 标签仅支持网络图片。`
  },
  //转发
  onShareAppMessage: function (res) {
    return {
      title: '转发',
      path: '/pages/index/community/topic/topic?jsonStr=' + this.data.list,
      success: function (res) {
        console.log('成功', res)
      }
    }
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