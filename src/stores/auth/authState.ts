// 로그인 상태 관리
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const authState = atom({
  key: `authState/${v1()}`,
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

export const userDataState = atom({
  key: `userData/${v1()}`,
  default: {
    userId: 0,
    email: '',
    userUid: '',
    profile: '',
    description: '',
  },
});
