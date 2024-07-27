/* eslint-disable no-param-reassign */
// // src/services/axiosInstance.tsx
// import axios from 'axios';
// import { getCookie, setCookie, removeCookie } from '../utils/cookiesUtils';

// const APIInstance = axios.create({
//   baseURL: 'https://pup.pinomaker.com/api/v1',
//   withCredentials: true,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     'accept-language': 'en-US',
//   },
// });

// APIInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie('pup_access');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// APIInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       const refreshToken = getCookie('pup_refresh');

//       if (refreshToken) {
//         try {
//           const response = await axios.post(
//             'https://pup.pinomaker.com/api/v1/auth/reissue',
//             { refreshToken },
//             { withCredentials: true }
//           );
//           const { accessToken } = response.data;
//           setCookie('pup_access', accessToken, { expires: 1 });
//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//           return APIInstance(originalRequest);
//         } catch (refreshError) {
//           removeCookie('pup_access');
//           removeCookie('pup_refresh');
//           window.location.href = '/login';
//         }
//       } else {
//         window.location.href = '/login';
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default APIInstance;

import axios from 'axios';
import { getCookie, setCookie, removeCookie } from '../utils/cookiesUtils';

const APIInstance = axios.create({
  baseURL: 'https://pup.pinomaker.com/api/v1',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'accept-language': 'en-US',
  },
});

//  초기 로그인 시 사용
APIInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('pup_access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API -> 토큰 만료 -> 재발급 -> 쿠기, 해더에 다시 교체 -> 재요청
// ! 리프레쉬 토큰

export default APIInstance;
