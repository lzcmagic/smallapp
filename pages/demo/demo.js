// pages/demo/demo.js


var helloData={name:'wechat'}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    helloData:helloData
  },

  changeName:function(){
    this.setData({name:'mina'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
  },

  bindTapLogs:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onReachBottom')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title:'demo_demo',
      path:'/pages/demo/demo'
    }
  },

  formSubmit:function(e){
    console.log('form发生submit 携带数据为：',e.detail.value)
  },

  formReset:function(){
    console.log('form发生reset事件')
  }

})