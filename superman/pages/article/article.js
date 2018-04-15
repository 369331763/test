// pages/article/article.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data:{
    userInfo: {},
    article: '',
    author:'',
    createDate:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var article='';
    var that = this;

    var user = app.globalData.userInfo;

    //更新数据
    that.setData({
      userInfo: user
    })
    //var desturl = "https://mp.weixin.qq.com/s?__biz=MzIxNTQwMjUyMQ==&mid=100000001&idx=1&sn=3bda2f4c0419b94214d4a18ec1c8ec3f&mpshare=1&scene=23&srcid=0305TynJ0SUE7NmJsh8R2Oby#rd";
    var url = "http://localhost:80820/easy-shopping/article/jsonarticle.jhtml";
    //var url = "http://localhost:8080/easy-shopping/article_import/quickstart.jhtml";

    wx.request({
      url: url,
      data: {
       // desturl: desturl, categoryid: 8,
       id:options.id
       },
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        console.log(res.data);
          //that.setData({})
        that.setData({
          author: res.data.article.author,
          createDate: res.data.article.createDate
        })
          article=res.data.article.content;
          WxParse.wxParse('article', 'html', article, that);
      },
      fail: function (err) {
        wx.showToast({
          title: '刷新失败',
          icon: 'loading',
          duration: 1200
        })
        var htm ="<p><img data-src='https://mmbiz.qpic.cn/mmbiz_png/ibQ2cXpBDzUMdznu6IhvNN4YuBnYjhbDpe3sVwRhticoZZdQL9WOTZO380lVTMqkUQwY9ulvbVkXK4PE1owjGz7g/640?wx_fmt=png' data-type='png' class='' data-ratio='0.1378737541528239' data-w='602'  /></p><p><br  /></p><p style='white-space: normal;text-align: justify;'><span style='font-size: 18px;'>2018全国两会正在进行，今年首次当选全国人大代表、苏宁控股集团董事长张近东带来了一份关于精准扶贫的建议。</span></p><p><span style='font-size: 18px;text-align: justify;'>&nbsp;</span><br  /></p><p style='text-align: center;'><img class='' data-copyright='0' data-ratio='0.7438928289992119' data-s='300,640' data-src='https://mmbiz.qpic.cn/mmbiz_jpg/ibQ2cXpBDzUOrF8Uln5MgS5HvShjxDXMbNp3spB0mKo6dF9J7s88CELAxeJcjbMSbwkDkz6ibQbzfU4Eb4OFaUCg/640?wx_fmt=jpeg' data-type='jpeg' data-w='1269' style=''  /></p><p style='text-align: justify;'><strong><span style='font-size: 18px;color: rgb(136, 136, 136);'>全国人大代表、苏宁控股集团董事长张近东</span></strong><br  /></p><p style='text-align: justify;'><br  /></p><p style='text-align: justify;'><span style='font-size: 18px;'>这不是张近东在两会上第一次献言精准扶贫。在张近东15年履职全国政协委员期间，他8次聚焦农村、农民议题，始终聚焦精准扶贫。“不但扶今日、更要扶永久”已成为张近东的扶贫“课题”，他认为防止脱贫农民返贫更值得思考。</span></p><p style='text-align: justify;'><span style='font-size: 18px;'><br  /></span></p><p style='text-align: justify;'><span style='font-size: 18px;'>张近东表示,当前的电商扶贫模式还不够精准，产业扶贫长效机制建设不足，对于贫困户持续“造血”致富功能还有待加强。他建议，政府要加强对贫困县基础设施建设的支持，并将扶贫方式从捐赠扶贫、销售扶贫向产业扶贫、就业扶贫、创业扶贫及集体经济增收扶贫等模式转移。</span></p><p style='text-align: justify;'><span style='font-size: 18px;'><br  /></span></p><p><img class='' data-copyright='0' data-ratio='0.75' data-s='300,640' data-src='https://mmbiz.qpic.cn/mmbiz_jpg/ibQ2cXpBDzUOrF8Uln5MgS5HvShjxDXMbMNuLnIjoaicR0rLFcP638Wibd6pgnpvKEudSUh90YyweXBJOlJFWk7RQ/640?wx_fmt=jpeg' data-type='jpeg' data-w='1280' style=''  /></p><p style='text-align: center;'><strong><span style='font-size: 18px;color: rgb(136, 136, 136);'>苏宁易购助力湖南中方葡萄销售</span></strong><br  /></p><p style='text-align: justify;'><span style='font-size: 18px;'><br  /></span></p><p style='text-align: justify;'><span style='font-size: 18px;'>&nbsp;“要打好精准扶贫，必须要聚焦三件事：一是推动产品上行，让电子商务直通田间地头，精准造福农村；二是要与农户对接，帮助他们提升产品品质，实现产品品牌化、规模化经营；三是要深化渠道下沉，让品质生活进村入户，精准造福农民生活。”张近东说道。</span></p><p style='text-align: justify;'><span style='font-size: 18px;'><br  /></span></p><section class='' data-id='32290' data-color='rgb(30, 155, 232)' data-custom='rgb(30, 155, 232)' style='font-size: 16px;white-space: normal;max-width: 100%;box-sizing: border-box;color: rgb(62, 62, 62);font-family: 微软雅黑;line-height: 23.2727px;border-width: 0px;border-style: none;border-color: initial;background-color: rgb(255, 255, 255);word-wrap: break-word !important;'><section style='margin-top: 5px;margin-bottom: 5px;max-width: 100%;box-sizing: border-box;clear: both;border-width: 0px;border-style: none;border-color: initial;word-wrap: break-word !important;'><section style='max-width: 100%;box-sizing: border-box;border-top: 2.5px solid rgb(30, 155, 232);border-right-color: rgb(30, 155, 232);border-bottom-color: rgb(30, 155, 232);border-left-color: rgb(30, 155, 232);font-size: 1em;text-decoration: inherit;color: rgb(255, 255, 255);word-wrap: break-word !important;'><section style='margin-top: 2px;max-width: 100%;box-sizing: border-box;border-width: 0px;border-style: initial;border-color: rgb(30, 155, 232);overflow: hidden;color: inherit;word-wrap: break-word !important;'><section style='max-width: 100%;box-sizing: border-box;display: inline-block;font-size: 1em;font-family: inherit;text-align: inherit;text-decoration: inherit;color: inherit;border-color: rgb(30, 155, 232);word-wrap: break-word !important;'><p style='padding: 5px 10px;max-width: 100%;min-height: 1em;display: inline-block;line-height: 1.4em;height: 32px;vertical-align: top;font-family: inherit;font-weight: bold;float: left;color: inherit;border-color: rgb(15, 95, 145);background-color: rgb(30, 155, 232);box-sizing: border-box !important;word-wrap: break-word !important;'><span style='max-width: 100%;font-size: 18px;box-sizing: border-box !important;word-wrap: break-word !important;'>大家都在看</span></p><section style='max-width: 100%;display: inline-block;vertical-align: top;width: 0px;height: 0px;border-top: 32px solid rgb(30, 155, 232);border-right: 32px solid transparent;border-top-right-radius: 4px;border-bottom-left-radius: 2px;color: inherit;box-sizing: border-box !important;word-wrap: break-word !important;'></section></section></section></section></section></section><p style='white-space: normal;'><a href='http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&amp;mid=2658506396&amp;idx=1&amp;sn=fabca9753aca451eade7827efad799b6&amp;chksm=bd5d42f38a2acbe5a931c60fe1caf19f0d7512469a1e221d3596c48debe81534991ccd68e22e&amp;scene=21#wechat_redirect' target='_blank' style='color: rgb(0, 128, 255);text-decoration: underline;'><span style='color: rgb(0, 128, 255);'>看了这些照片，你会发现欠他一个赞…</span></a><br  /></p><p style='white-space: normal;'><a href='http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&amp;mid=2658506373&amp;idx=2&amp;sn=ffe480cd2fa3219786baf68d93dd3bfb&amp;chksm=bd5d42ea8a2acbfcc546f750c11cdf730ff56881590c744c4a2c86a6a1e43d784b95ea14b811&amp;scene=21#wechat_redirect' target='_blank' style='color: rgb(0, 128, 255);text-decoration: underline;'>王毅在记者会后又说了一句话，简直太解气！</a><br  /></p><p style='white-space: normal;'><a href='http://mp.weixin.qq.com/s?__biz=MjM5NzI3NDg4MA==&amp;mid=2658506396&amp;idx=2&amp;sn=a19cee09abfb6967043f43bfcc20682d&amp;chksm=bd5d42f38a2acbe5592ad32d6137ff0b111a6954367728854d33b49112dad448537d826ba2ca&amp;scene=21#wechat_redirect' target='_blank' style='color: rgb(0, 128, 255);text-decoration: underline;'><span style='color: rgb(0, 128, 255);'>超燃！这首动画RAP霸屏，根本停不下来…</span></a><br  /></p><p style='white-space: normal;'><br  /></p><p style='white-space: normal;'><span style='font-size: 16px;'>（来源：人民网）</span></p>";
        WxParse.wxParse('article', 'html', htm, that);
        console.log(err)
      }
    })
    


  },
  seeAuthor:function (event){
    var userid = event.currentTarget.dataset.userid;
    wx.navigateTo({
      url: "../myadd/myadd?userid=" + userid
    })
  }
})