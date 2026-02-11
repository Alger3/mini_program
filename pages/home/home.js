Page({
  goToMenu() {
    wx.navigateTo({ url: '/pages/menu/menu' }); // 跳转到点餐页
  },
  goToBills() {
    wx.navigateTo({ url: '/pages/bill/bill'});
  },
  goToSports() {
    wx.navigateTo({ url: '/pages/sports/sports'});
  },
  goToDiet() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  },
  goToGraphs() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  },
  goToInstruction() {
    wx.navigateTo({ url: '/pages/instruction/instruction'});
  }
})