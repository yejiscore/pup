import React, { FormEvent, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import useMutate from '../../hooks/useMutate';

import { setCookie } from '../../utils/cookiesUtils';
import { authState } from '../../stores/auth/authState';

const LoginMain = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('1234');
  const setAuthState = useSetRecoilState(authState);

  const { mutate: loginMutate } = useMutate('/login', '/auth/login', 'post');

  const onSubmit = (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    loginMutate(
      { email, password },
      {
        onSuccess: ({ data }) => {
          // main으로 페이지 이동
          setAuthState({
            userId: data.userId,
            email: data.email,
            nickname: data.nickname,
            userUid: data.userUid,
            token: {
              accessToken: data.token.accessToken,
              refreshToken: data.token.refreshToken,
            },
          });
          setCookie('pup_access', data.token.accessToken, {
            path: '/', // root로 설정
            // secure: true, // https에서만 사용
            expires: new Date(new Date().getTime() + 30 * 60 * 1000), // 30분
          });
          setCookie('pup_refresh', data.token.refreshToken, {
            path: '/', // root로 설정
            // secure: true, // https에서만 사용
            expires: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7일
          });

          navigate('/');
        },
        onError: (error) => {
          // console.error('로그인 실패:', error);
        },
      }
    );
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      <input
        type="email"
        placeholder="아이디"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="button" onClick={onSubmit}>
        확인
      </button>
    </form>
  );
};

export default LoginMain;
