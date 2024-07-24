import axios from 'axios';
import { getCookie } from '../utils/cookiesUtils';

const APIInstance = axios.create({
  //   baseURL: process.env.REACT_API_URL,
  baseURL: 'https://pup.pinomaker.com/api/v1',
  withCredentials: true, // 쿠키를 서버로 전송하기 위해
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'accept-language': 'en-US', // 필요에 따라 헤더 추가
  },
});

APIInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('pup_access');
    if (token) {
      const newConfig = { ...config };
      newConfig.headers.Authorization = `Bearer ${token}`;
      return newConfig;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default APIInstance;
