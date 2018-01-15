
var chart = require("../../utils/chart.js");

//获取应用实例
const app = getApp();
Page({

  data: {
    weatherKey: app.weatherInfo1.weatherKey,
  },
  onLoad: function (options) {
    chart.draw(this, 'canvas1', {
      title: {
        text: "2017城市人均收入(万)",
        color: "#333333"
      },
      xAxis: {
        data: ['北京', '上海', '杭州', '深圳', '广州']
      },
      series: [
        {
          name: "最高温度",
          category: "line",
          data: [37, 63, 60, 78, 92]
        },
        {
          name: "最低温度",
          category: "line",
          data: [20, 35, 38, 59, 48]
        },
        // {
        //   name: ['北京', '上海', '杭州', '深圳', '广州', '成都'],
        //   category: "pie",
        //   data: [40, 38, 39, 28, 27, 33]
        // }
      ]
    });

    this.getWeather();
  },
  onSaveClick: function () {
    chart.saveCanvans(function () {

    });
  },



  getWeather: function () {
    var that = this
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather/forecast',
      data: {
        key: that.data.weatherKey,
        location: '120.28429,31.52853'
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
      },
      fail: function (res) {
      },
      complete: function () {
      }
    })
  },


})