//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    console.log('logs_onLoad')
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },
  onReady: function () { console.log('logs_onReady')},
  onShow: function () { console.log('logs_onShow')},
  onHide: function () { console.log('logs_onHide')},
  onUnload: function () { console.log('logs_onUnload')}
})
