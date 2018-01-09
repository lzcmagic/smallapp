var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }],
    view1:'app',
    staffA:{firstName:'aa',lastName:'aaa'},
    staffB:{firstName:'bb',lastName:'bbb'},
    staffC:{firstName:'cc',lastName:'ccc'},
    count:1
  },

  handleTap1:function(){console.log('handleTap1')},
  handleTap2: function () { console.log('handleTap2')},
  handleTap3: function () { console.log('handleTap3')},

  count:function(){
    this.setData({
      count:this.data.count+1
    })
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  }
})