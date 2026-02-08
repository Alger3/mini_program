Page({
  goToMenu() {
    wx.navigateTo({ url: '/pages/menu/menu' }); // 跳转到点餐页
  },
  goToRecords() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  },
  goToSports() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  },
  goToDiet() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  },
  goToGraphs() {
    wx.showToast({ title: '记录功能开发中...', icon: 'none' });
  }
})