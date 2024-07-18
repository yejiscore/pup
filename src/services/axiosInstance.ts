import axios from 'axios';

const APIInstance = axios.create({
  //   baseURL: process.env.REACT_API_URL,
  baseURL: 'https://pup.pinomaker.com/api/v1',
  withCredentials: true, // 쿠키를 서버로 전송하기 위해
  timeout: 10000,
});

export default APIInstance;
