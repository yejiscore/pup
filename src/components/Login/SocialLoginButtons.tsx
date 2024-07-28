import React from 'react';
import styled from 'styled-components';
import kakaoLogo from '../../assets/login/kakaologo.png';
import naverLogo from '../../assets/login/naverlogo.png';
import googleLogo from '../../assets/login/googlelogo.png';

const SocialButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  margin-top: 15px;
`;

const Button = styled.button`
  width: calc(100% - 40px);
  height: 40px;
  border-radius: 100px;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  position: relative;
`;

const KakaoButton = styled(Button)`
  background-color: #fee500;
  color: #000000;
`;

const NaverButton = styled(Button)`
  background-color: #03c75a;
`;

const GoogleButton = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #ccc;
`;

const SocialIcon = styled.img`
  width: 18px;
  height: 18px;
  position: absolute;
  left: 20px;
`;

interface SocialLoginButtonsProps {
  handleKakaoLogin: () => void;
  handleNaverLogin: () => void;
  handleGoogleLogin: () => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({
  handleKakaoLogin,
  handleNaverLogin,
  handleGoogleLogin,
}) => {
  return (
    <SocialButtonContainer>
      <KakaoButton type="button" onClick={handleKakaoLogin}>
        <SocialIcon src={kakaoLogo} alt="Kakao" />
        카카오 로그인
      </KakaoButton>
      <NaverButton type="button" onClick={handleNaverLogin}>
        <SocialIcon src={naverLogo} alt="Naver" />
        네이버 로그인
      </NaverButton>
      <GoogleButton type="button" onClick={handleGoogleLogin}>
        <SocialIcon src={googleLogo} alt="Google" />
        Sign up with Google
      </GoogleButton>
    </SocialButtonContainer>
  );
};

export default SocialLoginButtons;
