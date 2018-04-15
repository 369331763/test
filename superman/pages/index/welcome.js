//index.js
//获取应用实例
var util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    banners: ["../../images/index-focus-1.png", "../../images/index-focus-2.png"],
    notice: [],
    feed: [],
    feed_length: 0
  },
  onLoad: function () {
    var that = this;
    this.getData();
   
  },
  getScanning: function () {
    app.getScanning()
  },
  upper: function () {
    console.log("upper");
    wx.showNavigationBarLoading()
    this.refresh();
    
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    console.log("lower")
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    
  },
  //网络请求数据, 实现首页刷新
  refresh0: function () {
    var index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
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

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  },
  //事件处理函数
  bindItemTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id='+id
    })
  },
  bindQueTap: function (e) {
    debugger
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + id
    })
  },
  seeAuthor: function (event) {
    var userid = event.currentTarget.dataset.userid;
    wx.navigateTo({
      url: "../myadd/myadd?userid=" + userid
    })
  },





  getPageData:function(){
    wx.request({
      url: "http://localhost:8080/easy-shopping/article/jsonlist.jhtml",
      data: {
        category: 8, pageNumber: 5
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
        var notice = [];
        if (res.data.articleList.totalPages <= 0) {
          return;
        }
        var content = res.data.articleList.content;
        for (var i = 0; i < content.length; i++) {
          var param = {};
          var pathimg = "notice[" + i + "].image";
          // param[pathimg] = res.data[i].Bike_id;
          param[pathimg] = "../../images/notice-1.png";
          var pathid = "notice[" + i + "].id";
          param[pathid] = content[i].id;
          var pathtitle = "notice[" + i + "].title";
          param[pathtitle] = content[i].title;
          var pathdesc = "notice[" + i + "].desc";
          param[pathdesc] = content[i].seoTitle;
          that.setData(param);
          var notice = that.data.notice;
          that.setData({
            notice: notice
          })

        }


        /**
         *  that.setData({
           banners: res.data.banners
         })
         * **/
      },
      fail: function (err) {
        wx.showToast({
          title: '刷新失败',
          icon: 'loading',
          duration: 1200
        })
        var notice = [];
        var param = {};
        var pathimg = "notice[0].image";
        // param[pathimg] = res.data[i].Bike_id;
        param[pathimg] = "../../images/notice-1.png";
        var pathid = "notice[0].id";
        param[pathid] = "0";
        var pathtitle = "notice[0].title";
        param[pathtitle] = "标题标题标题标题标题题标题标题";
        var pathdesc = "notice[0].desc";
        param[pathdesc] = "简介简介简介简介简介简介简介简介简介介简介简介简介简介简介简介简介简介简介";


        var pathimg = "notice[1].image";
        // param[pathimg] = res.data[i].Bike_id;
        param[pathimg] = "../../images/notice-2.png";
        var pathid = "notice[1].id";
        param[pathid] = "1";
        var pathtitle = "notice[1].title";
        param[pathtitle] = "标题标题标题标题标题题标题标题";
        var pathdesc = "notice[1].desc";
        param[pathdesc] = "简介简介简介简介简介简介简介简介简介介简介简介简介简介简介简介简介简介简介";


        var pathimg = "notice[2].image";
        // param[pathimg] = res.data[i].Bike_id;
        param[pathimg] = "../../images/notice-3.png";
        var pathid = "notice[2].id";
        param[pathid] = "2";
        var pathtitle = "notice[2].title";
        param[pathtitle] = "标题标题标题标题标题题标题标题";
        var pathdesc = "notice[2].desc";
        param[pathdesc] = "简介简介简介简介简介简介简介简介简介介简介简介简介简介简介简介简介简介简介";
        that.setData(param);
        var notice = that.data.notice;
        that.setData({
          notice: notice
        })
        console.log(err)
      }
    })
  }
})
