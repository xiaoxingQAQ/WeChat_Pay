import hyRequest from './index';

/**
 * 支付
 * @param {string} price 
 * @returns 
 */
export function payment(price) {
  return hyRequest.post('/api/pay', {
    price
  });
}