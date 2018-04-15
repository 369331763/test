

Page({
    data: {
        banner_id:"",
        banner_flag:"",
        content: "",
        create_time: "",
        update_time: "",
        isNew: true,
        isedit:false,
        focus: false
    },
    onLoad: function (options) {
      this.setData({
        banner_id: options.id,
        banner_flag: options.flag,
        content: options.content
      })
    },

    /* 页面渲染事件 */
    onShow: function () {
        
    },

    /* 保存数据事件 */
    onSubmit: function (event) {
        var id = this.data.banner_id;
        var flag = this.data.banner_flag;
        var result = event.detail.value;
        var pages = getCurrentPages();
        //var currPage = pages[pages.length - 1];   //当前页面
        var prevPage = pages[pages.length - 2];  //上一个页面

        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        if("title"==flag){
          prevPage.setData({
            title: result.content
          })
        }else{
          var htmdata = prevPage.data.htmdata;
          for (var i = 0; i < htmdata.length; i++) {
            if (htmdata[i].id == id) {
              htmdata[i].content = result.content;
            }
          }
          prevPage.setData({
            htmdata: htmdata
          })
        }
        
      wx.navigateBack();
    },
    onFocus: function (e) {
        this.setData({
            focus: true
        });
    },
    /* 请求服务器保存数据 */
    
    /* 删除记事本事件 */
    goToBack: function (event) {
      wx.navigateBack();
    }
});
