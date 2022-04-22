import { hyLoginRequest } from './index';

export function getLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => { 
        reject(err);
      }
    });
  })
}

/**
 * 获取token
 * @param {string} code 
 * @returns 
 */
export function codeToToken(code) {
  return hyLoginRequest.post('/login', {
    code
  })
}

/**
 * 获取token
 * @param {string} token 
 * @returns 
 */
export function checkToken(token) {
  return hyLoginRequest.post('/auth', { token }, true)
}

export function checkSession() {
  return new Promise(resolve => {
    wx.checkSession({
      success: () => {
        resolve(true);
      },
      fail: () => {
        resolve(false);
      }
    });
  })
}

export function getUserProfile() {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '展示用户信息',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}