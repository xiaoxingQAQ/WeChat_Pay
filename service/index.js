const BASE_URL = 'https://pay.hualin688.com';

// const LOGIN_BASE_URL = 'https://pay.hualin688.com';

const LOGIN_BASE_URL = 'http://123.207.32.32:3000';


import { TOKEN_KEY } from '../constants/token-const';

const token = wx.getStorageSync(TOKEN_KEY);

class HYRequest {
  constructor(baseURL, authHeader = {}) {
    this.baseURL = baseURL;
    this.authHeader = authHeader;
  }
  
  request(url, method, params, isAuth = false, header = {}) {
    const finalHeader = isAuth ? { ...this.authHeader, ...header } : header;
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        data: params,
        header: finalHeader,
        success: (res) => {
          resolve(res.data);
        },
        fail: (err) => {
          console.log(err);
          reject(err)
        }
      })
    })
  }

  get(url, params, isAuth = false, header) {
    return this.request(url, "GET", params, isAuth, header);
  }

  post(url, data, isAuth = false, header) {
    return this.request(url, "POST", data, isAuth, header);
  }
}

const hyRequest = new HYRequest(BASE_URL);

const hyLoginRequest = new HYRequest(LOGIN_BASE_URL, {
  token
});

export default hyRequest;

export {
  hyLoginRequest
}