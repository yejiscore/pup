// 로그인 상태 관리
import { atom } from 'recoil';

const authState = atom({
  key: 'authState',
  default: {
    userId: '',
    email: '',
    nickname: '',
    userUid: '',
    token: {
      accessToken: '',
      refreshToken: '',
    },
  },
});

export default authState;
