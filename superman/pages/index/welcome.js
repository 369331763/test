//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    banners: ["../../images/index-focus-1.png", "../../images/index-focus-2.png"],
    notice: []
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: "http://localhost:8080/easy-shopping/article/jsonlist.jhtml",
      data: {
        category: 8, pageNumber:5
      },
      header: {
         "Content-Type":"application/json"
      },
      success: function (res) {
        console.log(res.data);
        var notice = [];
        if (res.data.articleList.totalPages<=0){
          return ;
        }
        var content = res.data.articleList.content;
        for (var i = 0; i < content.length; i++) {
          var param = {};
          var pathimg = "notice[" + i +"].image";
          // param[pathimg] = res.data[i].Bike_id;
          param[pathimg] = "../../images/notice-1.png";
          var pathid = "notice[" + i + "].id";
          param[pathid] = content[i].id;
          var pathtitle = "notice[" + i +"].title";
          param[pathtitle] = content[i].title;
          var pathdesc = "notice[" + i +"].desc";
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
  },
  getScanning: function () {
    app.getScanning()
  }
})
