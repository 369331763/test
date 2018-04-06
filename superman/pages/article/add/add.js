// pages/article/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'<p>text</p>',
    htmdata: ["<p>text1</p>", "<p>text2</p>"]
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
  
  },
  /* 新增头部 */
  addTopTitle: function (event) {
    wx.navigateTo({
      url: "../addnew/text/text"
    })
  },
  /* 展开新增类型 */
  showPlus: function (event) {
    wx.navigateTo({
      url: "../create/index"
    })
  },
  /* 新增文字事件 */
  addTextBanner: function (event) {
    wx.navigateTo({
      url: "../create/index"
    })
  },
  /* 新增图片事件 */
  addImageBanner: function (event) {
    wx.navigateTo({
      url: "../create/index"
    })
  },
  /* 新增视频事件 */
  addVideoBanner: function (event) {
    wx.navigateTo({
      url: "../create/index"
    })
  }
})