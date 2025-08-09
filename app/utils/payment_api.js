// ~/utils/payment_api.js
import axios from 'axios';

const payment_api = axios.create({
  baseURL: 'https://api.nowpayments.io',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': '6V0QX2E-E154T8T-HDDA66Q-E2JR8BH'  // 🔐 required!
  },
});

export default payment_api;
