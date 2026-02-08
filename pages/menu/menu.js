let timer = null;

Page({
  data: {
    menuItems: [
      { id: 1, name: '糖醋排骨', count: 0 },
      { id: 2, name: '清炒土豆丝', count: 0 },
      { id: 3, name: '西红柿炒鸡蛋', count: 0 },
      { id: 4, name: '鱼香肉丝', count: 0 }
    ],
    totalCount: 0
  },

  goBack(){
    wx.navigateBack();
  },

  executeChange(id, type) {
    let total = 0;
    const newMenu = this.data.menuItems.map(item => {
      if (item.id === id) {
        if (type === 'plus') item.count++;
        else if (type === 'minus' && item.count > 0) item.count--;
      }
      total += item.count;
      return item;
    });
    this.setData({ menuItems: newMenu, totalCount: total });
  },

  startTimer(e) {
    const { id, type } = e.currentTarget.dataset;
    this.executeChange(id, type);
    timer = setInterval(() => { this.executeChange(id, type); }, 150);
  },

  stopTimer() {
    if (timer) { clearInterval(timer); timer = null; }
  },

  submitOrder() {
    if (this.data.totalCount === 0) {
      wx.showToast({ title: '请选择最少一道菜', icon: 'none' });
      return;
    }
    wx.showModal({ title: '点餐成功', content: `大厨已收到 ${this.data.totalCount} 份订单`, showCancel: false });
  }
})