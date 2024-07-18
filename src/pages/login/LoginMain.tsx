import React, { FormEvent, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useMutate from '../../hooks/useMutate';
import authState from '../../stores/auth/authState';

const LoginMain = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuthState = useSetRecoilState(authState);

  const { mutate: loginMutate } = useMutate('/login', '/auth/login', 'post');

  const onSubmit = (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    loginMutate(
      { email, password },
      {
        onSuccess: (data) => {
          // main으로 페이지 이동
          setAuthState({
            userId: data.userId,
            email: data.email,
            nickname: data.nickname,
            userUid: data.userUid,
            token: {
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            },
          });
          navigate('/');
          console.log('로그인 성공:', data);
        },
        onError: (error) => {
          console.error('로그인 실패:', error);
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
      />

      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={onSubmit}>
        확인
      </button>
    </form>
  );
};

export default LoginMain;
