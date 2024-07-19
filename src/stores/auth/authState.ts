// 로그인 상태 관리
import { atom } from 'recoil';
import { v1 } from 'uuid';

const authState = atom({
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

export default authState;
