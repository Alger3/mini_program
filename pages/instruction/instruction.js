Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 如果你不想在 WXML 里写死文字，可以把说明内容放在这里
    instructions: [
      { id: 'menu', title: '家庭菜单', color: '#07c160', desc: '记录全家人的每日菜谱，支持按日期查询。' },
      { id: 'bill', title: '消费记录', color: '#10aeff', desc: '精细化管理每一笔支出，财务账单清晰美观。' },
      { id: 'sports', title: '运动记录', color: '#c7c73b', desc: '打卡每日运动量，记录跑步、健身等数据。' },
      { id: 'diet', title: '饮食记录', color: '#f503e1', desc: '记录每日热量与营养，科学管理饮食健康。' },
      { id: 'graphs', title: '查看报表', color: '#ec0914', desc: '数据可视化，通过图表分析生活趋势。' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 可以在这里接收从首页传过来的参数，比如指定跳转到某个具体的说明位置
    console.log("说明手册已加载");
  },

  /**
   * 返回上一页
   */
  goBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {
    return {
      title: '生活小管家-功能说明手册',
      path: '/pages/instruction/instruction'
    };
  }
})