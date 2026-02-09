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

    const moneyReg = /^\d+(\.\d{1,2})?$/;
  
    if (!moneyReg.test(tempAmount) || parseFloat(tempAmount) <= 0) {
      wx.showToast({ title: '金额格式错误', icon: 'none' });
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
  },

  // 在 Page 对象中添加此函数
deleteBill(e) {
  const index = e.currentTarget.dataset.index; // 获取长按的索引
  const that = this;

  wx.showModal({
    title: '提示',
    content: '确定要删除这条消费记录吗？',
    confirmColor: '#ff4d4f', // 将确定按钮设为红色，起到警示作用
    success(res) {
      if (res.confirm) {
        // 用户点击确定
        let list = that.data.billList;
        list.splice(index, 1); // 从数组中移除该索引的元素

        that.setData({
          billList: list
        });

        wx.showToast({
          title: '已删除',
          icon: 'success'
        });
      }
    }
  });
}
})

