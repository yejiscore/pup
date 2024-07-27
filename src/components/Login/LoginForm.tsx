import React, { FC, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import BaseBox from '../../styles/common/BaseBox';
import logo from '../../assets/loginlogo.png';
import SocialLoginButtons from './SocialLoginButtons';
import KAKAO_JS_KEY from '../../config/kakaoConfig';

type FormValues = {
  email: string;
  password: string;
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 182.67px;
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const FormItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
`;

const InputFormWrapper = styled.div`
  text-align: center;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-left: 20px;
  font-size: 14px;
  color: #283330;
`;

const Input = styled.input<{ hasError: boolean }>`
  width: calc(100% - 60px);
  height: 40px;
  border-radius: 100px;
  background-color: white;
  padding-left: 20px;
  border: 2px solid;
  outline: none;
  border-color: ${(props) => (props.hasError ? 'red' : 'white')};
  margin: 10px auto;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? 'red' : '#283330')};
  }
`;

const ErrorMessage = styled.span<{ visible: boolean }>`
  color: #ff603e;
  font-size: 12px;
  margin-left: 34px;
  height: 16px;
  display: block;
  margin-top: 5px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

const Button = styled.button`
  width: calc(100% - 40px);
  height: 40px;
  border-radius: 100px;
  background-color: #00ae80;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  position: relative;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 25px;
  font-size: 14px;
  color: #283330;
`;

const SignupLinkContainer = styled.div`
  width: 100%;
  margin-top: 30px;
  text-align: center;
`;

const SignupLink = styled(Link)`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #283330;
  text-decoration: none;
`;

const LoginForm: FC = () => {
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data:any) => {
    const isValid = await trigger();
    if (isValid) {
      console.log(data);
      // 실제 인증 로직 추가
    }
    setIsError(true); // 항상 에러 상태를 설정
  };

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JS_KEY);
    }
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: (authObj) => {
        console.log('카카오 로그인 성공:', authObj);
        navigate('/signup_social');
      },
      fail: (err) => {
        console.error('카카오 로그인 실패:', err);
      },
    });
  };

  const handleGoogleLogin = () => {
    console.log('구글 로그인 성공');
    navigate('/signup_social');
  };

  const handleNaverLogin = () => {
    console.log('네이버 로그인 성공');
    navigate('/signup_social');
  };

  return (
    <BaseBox>
      <img
        src={logo}
        alt="Logo"
        style={{
          top: '111.13px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormItemWrapper>
            <Label htmlFor="email">이메일</Label>
            <InputFormWrapper>
              <Input
                id="email"
                type="email"
                placeholder="example@pup.com"
                hasError={!!errors.email || isError}
                {...register('email', { required: true })}
              />
            </InputFormWrapper>
            <ErrorMessage visible={!!errors.email || isError}>
              이메일을 다시 확인해주세요.
            </ErrorMessage>
          </FormItemWrapper>

          <FormItemWrapper>
            <Label htmlFor="password">비밀번호</Label>
            <InputFormWrapper>
              <Input
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                hasError={!!errors.password || isError}
                {...register('password', { required: true })}
              />
            </InputFormWrapper>
            <ErrorMessage visible={!!errors.password || isError}>
              비밀번호를 다시 확인해주세요.
            </ErrorMessage>
          </FormItemWrapper>
          <Button type="submit">로그인</Button>
        </Form>
        <Text>
          <div>또는</div>
        </Text>
        <SocialLoginButtons
          handleKakaoLogin={handleKakaoLogin}
          handleGoogleLogin={handleGoogleLogin}
          handleNaverLogin={handleNaverLogin}
        />
        <SignupLinkContainer>
          <SignupLink to="/login/signup">회원가입</SignupLink>
        </SignupLinkContainer>
      </Container>
    </BaseBox>
  );
};

export default LoginForm;
