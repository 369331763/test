// pages/article/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showView: false,
    topShowView: false,
    titleBackGround: '../../../../images/article/initpic.png',
    backColor: '',
    title: '点击添加标题',
    htmdata: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false);

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
  editTopTitle: function (event) {
    var content = event.currentTarget.dataset.content;
    var id = 0;
    var flag = event.currentTarget.dataset.flag;
    wx.navigateTo({
      url: "../text/text?type=edit&id=" + id + "&content=" + content + "&flag=title"
    })
    
  },
  /* 展开新增类型 */
  showOrHiddPlusForTop: function (event) {
    var that = this;
    that.setData({
      topShowView: !that.data.topShowView
    });
  },
  /* 展开新增类型 */
  showOrHiddPlus: function (event) {
    var that = this;
    that.setData({
      showView: event.currentTarget.id,
    });
  },
  /* 新增文字事件 */
  editTopPic: function (event) {
    var that = this;
    var titleBackGround = this.data.titleBackGround;
      wx.chooseImage({
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          //res.tempFilePaths[0];
          that.setData({
            titleBackGround: res.tempFilePaths[0]
          })
        }
      })
  },
  /* 新增文字事件 */
  editBanner: function (event) {
    var that = this;
    var htmdata = this.data.htmdata;
    var content = event.currentTarget.dataset.content;
    var id = event.currentTarget.dataset.id;
    var type = event.currentTarget.dataset.type;
    if(type=='txt'){
      wx.navigateTo({
        url: "../text/text?type=edit&id=" + id + "&content=" + content + "&flag=banner"
      })
    } else if (type == 'img'){
      wx.chooseImage({
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {
          var newhtm = [];
          for (var i = 0; i < htmdata.length; i++) {
            console.log(index + ":" + htmdata[i].id);
            if (htmdata[i].id == index && htmdata[i].type=='img' ) {
                htmdata[i].content = res.tempFilePaths[0];
              that.setData({
                htmdata: htmdata
              })
              break;
            }
          }
        }
      })
    } else if (type == 'vedio'){
        console.log("功能开发中····");
    }
    
  },
  /* 新增文字事件 */
  addTextBanner: function (event) {
    //ad banner
    var htmdata = this.data.htmdata;
    var dataset = event.currentTarget.dataset;
    var index = dataset.id; //拿到是第几个数组
    console.log("index" + index);
    var newid = parseInt(index) + 1;
    var newarray = {
      id: newid,
      type: 'txt',
      //content: temppath
      content: '点击编辑文字内容'
    };
    //便利》id的所有对象ID+1
    var newhtmdata = [];
    for (var i = 0; i < htmdata.length; i++) {
      if (index == 0) {
        if (i == 0) {
          newhtmdata[0] = newarray;
          newhtmdata[0].id = 1;
          console.log("i="+0+":id"+0)
        }
        console.log("i=" + (i + 1))
        newhtmdata[i + 1] = htmdata[i];
        newhtmdata[i + 1].id = parseInt(i) + 2;
        console.log("i=" + (i + 1) + ":id" + newhtmdata[i + 1].id)
      } else if (i < index) {
        newhtmdata[i] = htmdata[i];
        newhtmdata[i].id = parseInt(i)+1;
        console.log(newhtmdata[i].id + ":ID<");
        if (htmdata.length== index) {
        newhtmdata[i + 1] = newarray;
        newhtmdata[i + 1].id = parseInt(i) + 2;
        console.log(newhtmdata[i + 1].id + ":ID=");
        }
      } else if (i == index) {
        newhtmdata[i] = newarray;
        newhtmdata[i].id = parseInt(i)+1
        console.log(newhtmdata[i].id + ":ID=")
        newhtmdata[i + 1] = htmdata[i];
        newhtmdata[i + 1].id = parseInt(i) + 2;
        console.log(newhtmdata[i + 1].id + ":ID=");
      }  else {
        newhtmdata[i + 1] = htmdata[i];
        newhtmdata[i + 1].id = parseInt(i) + 2;
        console.log(newhtmdata[i + 1].id + ":ID>");
      }
    }
    if (htmdata.length==0){
      newhtmdata[0] = newarray;
      newhtmdata[0].id = 1;
      console.log("i=" + 0 + ":id" + 0)
    }
    this.setData({
      'htmdata': newhtmdata
    });

    /**
     * wx.navigateTo({
          url: "../create/index?id="+newid
        })
     * **/

  },
  /* 新增图片事件 */
  addImageBanner: function (event) {
    var that = this;
    var temppath = "../../../../images/article/initpic.png";
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有 
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片         //
        console.log("res.tempFilePaths " + res.tempFilePaths);
        temppath = res.tempFilePaths;
        var num_pic = temppath.length;
        console.log("pic_num"+num_pic);
        var dataset = event.currentTarget.dataset;
        var index = dataset.id; //拿到是第几个数组
        console.log("index" + index);
        var newid = parseInt(index) + 1;
        //ad banner
        var newarray = {
          id: newid,
          type: 'img',
          content: temppath[0]
         // content: '../../../../images/article/initpic.png'
        };
        var htmdata = that.data.htmdata;
        var newhtmdata = [];
        for (var i = 0; i < htmdata.length; i++) {
          if (index == 0) {
            if (i == 0) {
              newhtmdata[0] = newarray;
              newhtmdata[0].id = 1;
              console.log("i=" + 0 + ":id" + 0)
            }
            console.log("i=" + (i + 1))
            newhtmdata[i + 1] = htmdata[i];
            newhtmdata[i + 1].id = parseInt(i) + 2;
            console.log("i=" + (i + 1) + ":id" + newhtmdata[i + 1].id)
          } else if (i < index) {
            newhtmdata[i] = htmdata[i];
            newhtmdata[i].id = parseInt(i) + 1;
            console.log(newhtmdata[i].id + ":ID<");
            if (htmdata.length == index) {
              newhtmdata[i + 1] = newarray;
              newhtmdata[i + 1].id = parseInt(i) + 2;
              console.log(newhtmdata[i + 1].id + ":ID=");
            }
          } else if (i == index) {
            newhtmdata[i] = newarray;
            newhtmdata[i].id = parseInt(i) + 1
            console.log(newhtmdata[i].id + ":ID=")
            newhtmdata[i + 1] = htmdata[i];
            newhtmdata[i + 1].id = parseInt(i) + 2;
            console.log(newhtmdata[i + 1].id + ":ID=");
          } else {
            newhtmdata[i + 1] = htmdata[i];
            newhtmdata[i + 1].id = parseInt(i) + 2;
            console.log(newhtmdata[i + 1].id + ":ID>");
          }
        }
        if (htmdata.length == 0) {
          newhtmdata[0] = newarray;
          newhtmdata[0].id = 1;
          console.log("i=" + 0 + ":id" + 0)
        }
        console.log("newhtmdata:" + newhtmdata)
        that.setData({
          'htmdata': newhtmdata
        })   
    }
  })
  },
  /* 新增视频事件 */
  addVideoBanner: function (event) {
    wx.navigateTo({
      url: "../create/index"
    })
  },
  imageResetLoad: function (event) {
    this.setData({ imagesWidth: wx.getSystemInfoSync().windowWidth })
  },
  removeBanner:function(event){
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确认删除该模块？",
      confirmText: "确定",
      cancelText: "取消",
      success:function(res){
        if(res.confirm){
          var dataset = event.currentTarget.dataset;
          var index = dataset.id; //拿到是第几个数组
          var htmdata = that.data.htmdata;
          var newhtm = [];
          for (var i = 0; i < htmdata.length; i++) {
            console.log(index+":"+htmdata[i].id);
            if (htmdata[i].id == index) {
              htmdata.splice(i,1);
            }
          }
          that.setData({
            htmdata: htmdata
          })
        }
      }
    })
   
  }
})