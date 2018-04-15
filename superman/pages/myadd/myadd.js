//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    imageSize: {},
    userid:'',
    userInfo: {},
    feed: [],
    feed_length: 0
  },
  onLoad: function (options) {
    var that = this;
    var userid = options.userid;
    console.log("userid:" + userid);
    // 页面初始化 options为页面跳转所带来的参数
    var user = app.globalData.userInfo;
    if (!user) {
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res
              })
              // 当用户授权成功的时候，保存用户的登录信息
              console.log(res);
              var encryptedData = encodeURIComponent(res.encryptedData);//一定要把加密串转成URI编码
              var iv = res.iv;
              console.log("iv:" + iv + " encryptedData:" + encryptedData);
              //请求自己的服务器
            },
            fail: function (res) { //用户点了“拒绝”
              wx.showModal({
                title: "提示",
                content: "确认删除该模块？"
              }) // 向用户提示需要权限才能继续
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting["scope.userInfo"]) { } // 如果成功打开授权
                  else { } // 如果用户依然拒绝授权
                },
                fail: function () { //调用失败，授权登录不成功
                  fail()
                }
              })
            }
          })
        }
      })
    } else {
      //更新数据
      that.setData({
        userInfo: user
      })
      this.getData();
    }
  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  //使用本地 fake 数据实现刷新效果
  getData: function () {
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  }
})