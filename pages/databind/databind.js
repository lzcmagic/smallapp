// pages/databind/databind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'init data',
    array:[{text:'init data in array'},{text:'init data1 in array'}],
    object:{
      text:'init data in object'
    }
  },


  changeText:function(){this.setData({'text':'change data'})},
  changeItemInArray:function(){this.setData({'array[1].text':'change data in array'})},
  changeItemInObject:function(){this.setData({'object.text':'change data in object'})},
  addNewField:function(){this.setData({'newField.text':'new data'})},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})