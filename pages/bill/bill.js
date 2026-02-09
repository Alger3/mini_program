Page({
  data: {
    billList: [],
    showPopup: false,
    tempReason: '',
    tempAmount: ''
  },

  togglePopup() {
    this.setData({
      showPopup: !this.data.showPopup,
      tempReason: '',
      tempAmount: ''
    });
  },

  inputReason(e) { this.setData({ tempReason: e.detail.value }); },
  inputAmount(e) { this.setData({ tempAmount: e.detail.value }); },

  saveBill() {
    const { tempReason, tempAmount, billList } = this.data;
    if (!tempReason || !tempAmount) {
      wx.showToast({ title: '请填写完整', icon: 'none' });
      return;
    }

    const newBill = {
      reason: tempReason,
      amount: parseFloat(tempAmount).toFixed(2),
      date: new Date().toLocaleDateString()
    };

    this.setData({
      billList: [newBill, ...billList],
      showPopup: false
    });

    wx.showToast({ title: '保存成功', icon: 'success' });
  }
})