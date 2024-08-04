/* eslint-disable import/prefer-default-export */
// src/services/authService.ts
import { setCookie } from '../utils/cookiesUtils';
import APIInstance from './axiosInstance';

export const login = async (email: string, password: string) => {
  try {
    const response = await APIInstance.post('/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data;

    setCookie('pup_access', accessToken, { expires: 1 }); // 1일 후 만료
    setCookie('pup_refresh', refreshToken, { expires: 7 }); // 7일 후 만료

    return response.data;
  } catch (error) {
    throw new Error('로그인 실패');
  }
};
