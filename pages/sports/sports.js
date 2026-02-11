Page({
  data: {
    navHeight: 0,
    navTop: 0,
    showModal: false,
    currentType: '',
    customTypeName: '',
    startTime: '18:30',
    endTime: '19:00',
    sportTypes: [
      { name: '跑步', icon: '🏃' },
      { name: '健身', icon: '🏋️' },
      { name: '骑行', icon: '🚴' },
      { name: '游泳', icon: '🏊' },
      { name: '步行', icon: '🚶' },
      { name: '瑜伽', icon: '🧘' },
      { name: '篮球', icon: '🏀' },
      { name: '足球', icon: '⚽' },
      { name: '其他', icon: '✍' }
    ],
    history: []
  },

  onLoad() {
    // A. 设置导航栏高度逻辑
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const minsAdd1 = String(now.getMinutes() + 1).padStart(2, '0');

    this.setData({
      navTop: menuButtonInfo.top,
      navHeight: menuButtonInfo.height,
      startTime: `${hours}:${mins}`,
      endTime: `${hours}:${minsAdd1}`
    });

    // B. 【核心】从本地缓存读取记录
    const savedHistory = wx.getStorageSync('sports_history');
    if (savedHistory) {
      this.setData({
        history: savedHistory
      });
    }
  },

  goBack() {
    wx.navigateBack({ delta: 1 });
  },

  // 触发弹窗
  onAddSport(e) {
    this.setData({
      currentType: e.currentTarget.dataset.type,
      customTypeName: '', // 每次打开弹窗清空上一次输入
      showModal: true
    });
  },
  onTypeNameInput(e) {
    this.setData({ customTypeName: e.detail.value });
  },

  hideModal() {
    this.setData({ showModal: false });
  },

  bindStartTimeChange(e) {
    this.setData({ startTime: e.detail.value });
  },

  bindEndTimeChange(e) {
    this.setData({ endTime: e.detail.value });
  },

  // 核心逻辑：计算并提交
  submitRecord() {
    const { startTime, endTime, currentType, customTypeName, history } = this.data;

    // --- A. 确定最终显示的运动名称 ---
    let finalType = currentType;
    if (currentType === '其他') {
      if (!customTypeName.trim()) {
        wx.showToast({ title: '请输入运动内容', icon: 'none' });
        return;
      }
      finalType = customTypeName; // 将“其他”替换为用户输入的内容
    }

    // --- B. 计算时间差 ---
    const startArr = startTime.split(':').map(Number);
    const endArr = endTime.split(':').map(Number);
    let diffMinutes = (endArr[0] * 60 + endArr[1]) - (startArr[0] * 60 + startArr[1]);

    if (diffMinutes <= 0) {
      wx.showToast({ title: '结束时间需晚于开始', icon: 'none' });
      return;
    }

    // --- C. 格式化时长 (满1小时换算) ---
    let durationText = '';
    const h = Math.floor(diffMinutes / 60);
    const m = diffMinutes % 60;
    durationText = h > 0 ? `${h}小时${m > 0 ? m + '分钟' : ''}` : `${m}分钟`;

    // --- D. 自动获取年份和日期 ---
    const now = new Date();
    const autoDate = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;

    // --- E. 存入历史记录 ---
    const newRecord = {
      type: finalType, 
      timeRange: `${startTime}-${endTime}`,
      date: autoDate, 
      durationText: durationText
    };

    const newHistory = [newRecord, ...history];
    this.setData({
      history: newHistory,
      showModal: false
    });

    wx.setStorageSync('sports_history', newHistory);

    wx.showToast({ title: '记录成功', icon: 'success' });
  },
  doNothing() {
    // 仅仅为了阻断冒泡，不需要写任何逻辑
  },

  hideModal() {
    this.setData({ showModal: false });
  },

  // 长按删除记录
  onDeleteRecord(e) {
    const index = e.currentTarget.dataset.index;
    const record = this.data.history[index];
    
    wx.showModal({
      title: '提示',
      content: `确定要删除 ${record.type} 这条记录吗？`,
      confirmColor: '#c7c73b', // 保持和你按钮颜色一致
      success: (res) => {
        if (res.confirm) {
          // 1. 获取当前数组
          let newHistory = this.data.history;
          
          // 2. 移除点击的那一项
          newHistory.splice(index, 1);
          
          // 3. 更新页面显示
          this.setData({
            history: newHistory
          });
          
          // 4. 同步更新本地缓存
          wx.setStorageSync('sports_history', newHistory);
          
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
        }
      }
    });
  },
})