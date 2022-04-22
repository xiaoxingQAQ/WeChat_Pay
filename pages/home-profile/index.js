// pages/home-profile/index.js
import { getUserProfile } from '../../service/api_login'
import { USER_INFO } from '../../constants/token-const';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasToken: false,
    userInfo: undefined
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    getApp().handleLogin().then(({ token, userInfo }) => {
      this.setData({ userInfo, hasToken: true })
    })
  },

  // 事件处理
  /* 授权登录 */
  loginAuth() {
    this.getUserProfile().then(res => {
      // 调用登录
      getApp().handleLogin().then(res => {
        this.setData({ hasToken: true })
      })
    })
  },

  /* 获取用户信息 */
  getUserProfile() {
    return new Promise(resolve => {
      getUserProfile().then(({ userInfo }) => {
        userInfo.autoLogin = true;
        this.setData({ userInfo })
        getApp().globalData.userInfo = userInfo;
        wx.setStorageSync(USER_INFO, userInfo);
        resolve()
      }, err => {
        wx.showToast({
          title: '用户取消了授权',
          icon: 'none',
          duration: 1500,
          mask: false,
        });
      })
    })
  },


  /* 跳转支付 */
  handleToPay() {
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})