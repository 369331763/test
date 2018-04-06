//获取应用实例
const app = getApp()
Page({
  data: {
    item: {
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "我的推荐"
    },
    celldata: [{
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "邀请好友"
    }, {
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "我的微页"
    },{
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "营销模板"
    }, {
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "联系客服"
    }, {
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "微页社区"
    }, {
      imagesrc: "../../images/mine/arrow_right_setup_12x16_@2x.png",
      imagename: "微页公众号"
    }
     ]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var user= app.globalData.userInfo;
    if (!user) {
      wx.login({
        success: function (res) {
          var code = res.code;
          wx.getUserInfo({
            success: function (res) {
              debugger
              // 当用户授权成功的时候，保存用户的登录信息
              console.log(res2);
              var encryptedData = encodeURIComponent(res2.encryptedData);//一定要把加密串转成URI编码
              var iv = res2.iv;
          //请求自己的服务器
            },
            fail: function (res) { //用户点了“拒绝”
              wx.showModal({
                title: "提示",
                content: "确认删除该模块？"}) // 向用户提示需要权限才能继续
              wx.openSetting({
                success: function (res){
                  if(res.authSetting["scope.userInfo"]) { } // 如果成功打开授权
                  else {} // 如果用户依然拒绝授权
                },
                fail: function () { //调用失败，授权登录不成功
                  fail()
                }
          })
        }
      })
    }
  })
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

  }
})