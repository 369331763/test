var WxParse = require('wxParse/wxParse.js');
var util = require('utils/util.js');


App({
  onLaunch: function () {
    // 展示本地存储能力
    var userInfo;
    if (userInfo = wx.getStorageSync('userInfo')) {
      this.globalData.userInfo = userInfo;
    }
    this.getSystemInfo();

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getSystemInfo: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.systemInfo = res;
      }
    });
  },
  sendRequest: function (param, customSiteUrl) {
    var that = this,
      data = param.data || {},
      header = param.header,
      requestUrl;

    data._app_id = this.getAppId();
    data.app_id = this.getAppId();
    if (!this.globalData.notBindXcxAppId) {
      data.session_key = this.getSessionKey();
    }

    if (customSiteUrl) {
      requestUrl = customSiteUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        data = this.modifyPostParam(data);
        header = header || {
          'content-type': 'application/x-www-form-urlencoded;'
        }
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      this.showToast({
        title: '请求中...',
        icon: 'loading'
      });
    }
    wx.request({
      url: requestUrl,
      data: data,
      method: param.method || 'GET',
      header: header || {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode && res.statusCode != 200) {
          that.hideToast();
          that.showModal({
            content: '' + res.errMsg
          });
          return;
        }
        if (res.data.status) {
          if (res.data.status == 401) {
            that.login();
            return;
          }
          if (res.data.status != 0) {
            that.hideToast();
            that.showModal({
              content: '' + res.data.data
            });
            return;
          }
        }
        typeof param.success == 'function' && param.success(res.data);
      },
      fail: function (res) {
        that.showModal({
          content: '请求失败 ' + res.errMsg
        })
        typeof param.fail == 'function' && param.fail(res.data);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res.data);
      }
    });
  },
  turnToPage: function (url, isRedirect) {
    var tabBarPagePathArr = this.getTabPagePathArr();
    // tabBar中的页面改用switchTab跳转
    if (tabBarPagePathArr.indexOf(url) != -1) {
      this.switchToTab(url);
      return;
    }
    if (!isRedirect) {
      wx.navigateTo({
        url: url
      });
    } else {
      wx.redirectTo({
        url: url
      });
    }
  },
  switchToTab: function (url) {
    wx.switchTab({
      url: url
    });
  },
  turnBack: function () {
    wx.navigateBack();
  }, hideToast: function () {
    wx.hideToast();
  },
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },// 统计用户分享
  countUserShareApp: function () {
    this.sendRequest({
      url: ' '
    });
  },

  // 调用微信支付接口
  wxPay: function (param) {
    var _this = this;
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      success: function (res) {
        typeof param.success === 'function' && param.success();
        _this.wxPaySuccess(param);
      },
      fail: function (res) {
        if (res.errMsg === 'requestPayment:fail cancel') {
          return;
        }
        _this.showModal({
          content: res.errMsg
        })
        _this.wxPayFail(param, res.errMsg);
      }
    })
  },
  wxPaySuccess: function (param) {
    var orderId = param.orderId,
      goodsType = param.goodsType,
      formId = param.package.substr(10),
      t_num = goodsType == 1 ? 'AT0104' : 'AT0009';

    this.sendRequest({
      url: ' ',
      data: {
        formId: formId,
        t_num: t_num,
        order_id: orderId
      }
    })
  },
  wxPayFail: function (param, errMsg) {
    var orderId = param.orderId,
      formId = param.package.substr(10);

    this.sendRequest({
      url: ' ',
      data: {
        formId: formId,
        t_num: 'AT0010',
        order_id: orderId,
        fail_reason: errMsg
      }
    })
  }, 
  getSessionKey: function () {
    return this.globalData.sessionKey;
  },
  setSessionKey: function (session_key) {
    this.globalData.sessionKey = session_key;
    wx.setStorage({
      key: 'session_key',
      data: session_key
    })
  },
  getUserInfo: function () {
    return this.globalData.userInfo;
  },
  setUserInfoStorage: function (info) {
    for (var key in info) {
      this.globalData.userInfo[key] = info[key];
    }
    wx.setStorage({
      key: 'userInfo',
      data: this.globalData.userInfo
    })
  },
  submitForm: function (dataset) {
    let pageInstance = this.getCurrentPage();
    let _this = this;
    let compid = dataset.compid;
    let form = dataset.form;
    let form_data = pageInstance.data[compid].form_data;
    let field_info = pageInstance.data[compid].field_info;

    if (!util.isPlainObject(form_data)) {
      for (let i in field_info) {
        let field = field_info[i].field;
        if ((!form_data[field] || form_data[field].length == 0) && field_info[i].required == 1) { // 提示错误
          _this.showModal({
            content: field_info[i].title + '没有填写'
          });
          return;
        }
      }

      if (pageInstance.data[compid].submitting) return;
      let newdata = {};
      newdata[compid + '.submitting'] = true;
      pageInstance.setData(newdata);

      _this.sendRequest({
        url: '/',
        data: {
          form: form,
          form_data: form_data
        },
        header: { 'content-type': 'application/x-www-form-urlencoded;' },
        method: 'POST',
        success: function (res) {
          if (res.status == 0) {
            _this.showToast({
              title: '提交成功',
              icon: 'success'
            });
          }
        },
        complete: function () {
          let newdata = {};
          newdata[compid + '.submitting'] = false;
          pageInstance.setData(newdata);
        }
      })
    } else {
      _this.showModal({
        content: '这个表单什么都没填写哦！'
      });
    }
  },
  getAppId: function () {
    return this.globalData.appId;
  },
  getAppTitle: function () {
    return this.globalData.appTitle;
  },
  getAppDescription: function () {
    return this.globalData.appDescription;
  },
  globalData: {
    appId: 'wxb62c0524534fd3da',
    sessionKey: '',
    userInfo: null,
    appTitle: '小微页',
    appDescription: '我的应用'
  }
})