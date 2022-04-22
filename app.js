// app.js
import { getLoginCode, codeToToken, checkToken, checkSession } from './service/api_login'
import { TOKEN_KEY, USER_INFO } from './constants/token-const';

App({
  globalData: {
    userInfo: undefined
  },
  onLaunch() {
    const { autoLogin } = wx.getStorageSync('USER_INFO');
    // 自动检测登录
    if (autoLogin) this.handleLogin()
  },

  async handleLogin() {
    return new Promise(async (resolve) => {
      const token = wx.getStorageSync(TOKEN_KEY);
      const userInfo = wx.getStorageSync(USER_INFO);
      if (userInfo) {
        this.globalData.userInfo = userInfo
      }
      if (!token) {
        return this.getLoginCode().then(resolve)
      }
      // 判断token有没有过期
      const checkResult = await checkToken(token);
      // 判断session是否过期
      const isSessionValid = await checkSession();

      if (checkResult.errorCode || !isSessionValid) {
        this.getLoginCode().then(resolve)
      } else {
        resolve({ token, userInfo })
      }
      
    })
  },
  /* 登录 获取code */
  async getLoginCode() {
    return new Promise(async (resolve) => {
      // 从微信服务器获取code
      const { code } = await getLoginCode()
      console.log('code: ', code);

      // 获取 token
      const res = await codeToToken(code)
      if (res?.token) {
        wx.setStorageSync(TOKEN_KEY, res.token);
        resolve(res.token)
      }
    })
  },
})
