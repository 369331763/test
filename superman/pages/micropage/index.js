//index.js
//获取应用实例
var WxSearch = require('../../wxSearch/wxSearch.js')
var app = getApp()
Page({
  data: {
    srcurl:""
    // wxSearchData:{
    //   view:{
    //     isShow: true
    //   }
    // }
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['weappdev', '小程序', 'wxParse', 'wxSearch', 'wxNotification']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },
  wxSearchFn: function (e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);

  },
  wxSearchInput: function (e) {
    var that = this
    //WxSearch.wxSearchInput(e, that);
    this.setData({
      srcurl: e.detail.value
    });


  },
  wxSerchFocus: function (e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  quickImport:function(e){
    //获取url，调用后台进行url解析 发回成功页面 跳转到编辑页面
    console.log("copyUrl:" + this.data.srcurl);
    if (this.data.srcurl == ""){
      wx.showToast({
        title: '链接为空',
        icon: 'loading',
        duration: 1200
      })  
    }else{
      var url = "http://localhost:8080/easy-shopping/article_import/quickstart.jhtml";
      wx.request({
        url: url,
        data: {
          desturl: this.data.srcurl, categoryid: 8
        },
        header: {
          "Content-Type": "application/json"
        },
        success: function (res) {
          console.log(res.data);
          if (res.data.result=="0"){
            wx.showToast({
              title: '导入成功',
              icon: 'success',
              duration: 1200
            })
            //goto  edit page 
          }else{
            wx.showToast({
              title: '导入失败',
              icon: 'loading',
              duration: 1200
            })  
          }
          //that.setData({})
          //go to edit page
        },
        fail: function (err) {
          console.log(err)
        }
      })
    }
    


  },
  createnew:function(e){
    wx.navigateTo({
      url: '/pages/article/addnew/addnew/addnew'
    })
  },
  findMore:function(e){
    //跳转到我的主页
    wx.switchTab({
      url: '/pages/index/welcome'
    })
  }
})
