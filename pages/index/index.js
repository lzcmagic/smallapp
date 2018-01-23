//index.js
//获取应用实例
const app = getApp();
var chart = require("../../utils/chart.js");
Page({
  data: {
    latitude: 0,
    longitude: 0,
    weatherKey: app.weatherInfo1.weatherKey,
    addr: 'NA',
    realWeather: '0',//体感温度
    weather: 'na',
    tempImgUrl: '../../images/temp_number/notif_temp_',
    actualWeather: '0',//真实温度
    tempImgSuffix: '.png',
    windowWidth: '100%',
    windowHeight: '100%',
    weatherUrlImg: '',
    forecast: [],
    update_time:'',
    forecast_icon_d_array:[],
    forecast_icon_n_array: [],
  },

  onLoad: function () {
    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowWidth: res.windowWidth + 'px',
          windowHeight: res.windowHeight + 'px'
        })
      },
    });
    that.getMLocation();
  },




  getMLocation: function () {
    var that = this;
    that.showMLoad();
    wx.getLocation({
      type: 'wgs84',
      altitude: false,
      success: function (res) {
        that.setData({
          //纬度,
          latitude: res.latitude,
          //纬度
          longitude: res.longitude
        })
        that.getWeather();//请求当前温度
      },
      fail: function (res) {
        that.showMToast("定位失败");
        wx:wx.hideLoading();
        wx.stopPullDownRefresh();
      },
      complete: function (res) {
        //注释
        // wx: wx.hideLoading();
      },
    })
  },

  onShow: function () {

  },

  showMToast: function (res) {
    wx.showToast({
      title: res,
      icon: '',
      image: '../../images/failed.png',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  showMLoad: function () {
    wx.showLoading({
      title: '加载中',
      mask: true,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  getWeather: function () {
    var that = this
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/now',
      data: {
        key: that.data.weatherKey,
        location: that.data.longitude + ',' + that.data.latitude
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        var tempWeather = '0';
        var var0 = res.data.HeWeather6[0].now.tmp;
        if (var0 > -51 && var0 < 50) {
          if (var0 >= 0) {
            tempWeather = var0;
          } else {
            tempWeather = 'neg_' + Math.abs(var0);
          }
        }
        that.setData({
          actualWeather: tempWeather,
          addr: res.data.HeWeather6[0].basic.location,
          realWeather: res.data.HeWeather6[0].now.fl,
          weather: res.data.HeWeather6[0].now.cond_txt,
          weatherUrlImg: that.getWeatherUrl(res.data.HeWeather6[0].now.cond_code),
          update_time: res.data.HeWeather6[0].update.loc.split(" ")[1]
        })
      },
      fail: function (res) {
        that.showMToast("网络状态不佳，获取天气信息失败");
      },
      complete: function () {
        wx.hideLoading();
         wx.stopPullDownRefresh();
      }
    });



    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: {
        key: that.data.weatherKey,
        location: that.data.longitude + ',' + that.data.latitude
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          forecast: res.data.HeWeather6[0].daily_forecast,
        });
        that.drawChart();
      },
      fail: function (res) {
      },
      complete: function () {}
    })
  },

  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    this.getMLocation();
  },

  drawChart: function () {
    var tempData = this.data.forecast;
    var tempMax = [];
    var tempMin = [];
    var tempDate = [];
    var tempWeatherCodeD=[];
    var tempWeatherCodeN=[];
    var tempWeatherCodeDD = [];
    var tempWeatherCodeND = [];
    for (var i = 0; i < tempData.length; i++) {
      tempMax[i] = tempData[i].tmp_max;
      tempMin[i] = tempData[i].tmp_min;
      tempDate[i] = "周"+this.getChineseNumber(new Date(tempData[i].date).getDay());
      tempWeatherCodeD[i] = tempData[i].cond_code_d;
      tempWeatherCodeN[i] = tempData[i].cond_code_n;
      tempWeatherCodeDD[i] = tempData[i].cond_txt_d;
      tempWeatherCodeND[i] = tempData[i].cond_txt_n;
    }
    this.setData({
      forecast_icon_d_array: tempWeatherCodeD,
      forecast_icon_n_array: tempWeatherCodeN,
    })
    chart.draw(this, 'canvas1', {
      title: {
        text: "最近三天天气",
        color: "#333333"
      },
      xAxis: {
        data: tempDate,
        weatherD: tempWeatherCodeD,
        weatherN: tempWeatherCodeN,
        weatherDD: tempWeatherCodeDD,
        weatherND: tempWeatherCodeND,
      },
      series: [
        {
          name: "最高温度",
          category: "line",
          data: tempMax
        },
        {
          name: "最低温度",
          category: "line",
          data: tempMin
        },
        // {
        //   name: ['北京', '上海', '杭州', '深圳', '广州', '成都'],
        //   category: "pie",
        //   data: [40, 38, 39, 28, 27, 33]
        // }
      ]
    });
  },


  getChineseNumber:function(num){
    var chineseNum;
    switch(num){
      case 1:chineseNum="一";break;
      case 2: chineseNum = "二";break;
      case 3: chineseNum = "三";break;
      case 4: chineseNum = "四";break;
      case 5: chineseNum = "五";break;
      case 6: chineseNum = "六";break;
      case 7: chineseNum = "七";break;
      default: chineseNum = "一";break;
    }
    return chineseNum;
  },

  getWeatherUrl: function (code) {
    console.log('code:' + code)
    var url;
    switch (code) {
      case '100': url = '../../images/weather_icon/100.png'; break;
      case '101': url = '../../images/weather_icon/101.png'; break;
      case '102': url = '../../images/weather_icon/102.png'; break;
      case '103': url = '../../images/weather_icon/103.png'; break;
      case '104': url = '../../images/weather_icon/104.png'; break;
      case '200': url = '../../images/weather_icon/200.png'; break;
      case '201': url = '../../images/weather_icon/201.png'; break;
      case '202': url = '../../images/weather_icon/202.png'; break;
      case '203': url = '../../images/weather_icon/203.png'; break;
      case '204': url = '../../images/weather_icon/204.png'; break;
      case '205': url = '../../images/weather_icon/205.png'; break;
      case '206': url = '../../images/weather_icon/206.png'; break;
      case '207': url = '../../images/weather_icon/207.png'; break;
      case '208': url = '../../images/weather_icon/208.png'; break;
      case '209': url = '../../images/weather_icon/209.png'; break;
      case '210': url = '../../images/weather_icon/210.png'; break;
      case '211': url = '../../images/weather_icon/211.png'; break;
      case '212': url = '../../images/weather_icon/212.png'; break;
      case '213': url = '../../images/weather_icon/213.png'; break;
      case '300': url = '../../images/weather_icon/300.png'; break;
      case '301': url = '../../images/weather_icon/301.png'; break;
      case '302': url = '../../images/weather_icon/302.png'; break;
      case '303': url = '../../images/weather_icon/303.png'; break;
      case '304': url = '../../images/weather_icon/304.png'; break;
      case '305': url = '../../images/weather_icon/305.png'; break;
      case '306': url = '../../images/weather_icon/306.png'; break;
      case '307': url = '../../images/weather_icon/307.png'; break;
      case '308': url = '../../images/weather_icon/308.png'; break;
      case '309': url = '../../images/weather_icon/309.png'; break;
      case '310': url = '../../images/weather_icon/310.png'; break;
      case '311': url = '../../images/weather_icon/311.png'; break;
      case '312': url = '../../images/weather_icon/312.png'; break;
      case '313': url = '../../images/weather_icon/313.png'; break;
      case '400': url = '../../images/weather_icon/400.png'; break;
      case '401': url = '../../images/weather_icon/401.png'; break;
      case '402': url = '../../images/weather_icon/402.png'; break;
      case '403': url = '../../images/weather_icon/403.png'; break;
      case '404': url = '../../images/weather_icon/404.png'; break;
      case '405': url = '../../images/weather_icon/405.png'; break;
      case '406': url = '../../images/weather_icon/406.png'; break;
      case '407': url = '../../images/weather_icon/407.png'; break;
      case '500': url = '../../images/weather_icon/500.png'; break;
      case '501': url = '../../images/weather_icon/501.png'; break;
      case '502': url = '../../images/weather_icon/502.png'; break;
      case '503': url = '../../images/weather_icon/503.png'; break;
      case '504': url = '../../images/weather_icon/504.png'; break;
      case '505': url = '../../images/weather_icon/505.png'; break;
      case '508': url = '../../images/weather_icon/508.png'; break;
      case '900': url = '../../images/weather_icon/900.png'; break;
      case '901': url = '../../images/weather_icon/901.png'; break;
      case '999': url = '../../images/weather_icon/999.png'; break;
      default:
        url = '../../images/weather_icon/100.png';
        break;
    }
    console.log('url: ' + url)
    return url;
  }
})
