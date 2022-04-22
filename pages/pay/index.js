// pages/home-pay/index.js
import { payment } from '../../service/api_pay'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /* 事件处理 */
  // 输入变化
  handleInputChange(event) {
    const price = event.detail.value
    this.setData({ price })
  },

  handlePayment() {
    console.log(this.data.price);
    const price = this.data.price;
    payment(price).then(res => {
      console.log('res: ', res);
    })
  }
})