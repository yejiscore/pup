// src/components/SignUp/Terms/Terms.tsx
import React, { FC } from 'react';
import styled from 'styled-components';
import XButton from '../../../assets/login/XButton.png';
import { LocationInfoTerms, PersonalInfoTerms, ServiceTerms } from './Texts';

const Container = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  overflow-y: auto;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
`;

const CloseButton = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const TermsTextContainer = styled.div`
  font-size: 14px;
  color: #283330;
  margin: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  gap: 30px;
  bottom: 0;
`;

const Button = styled.button`
  width: 162px;
  height: 42px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 22px;
`;

const AgreeButton = styled(Button)`
  background-color: #00ae80;
  color: white;
  border: none;
`;

const DisagreeButton = styled(Button)`
  background-color: white;
  color: #00ae80;
  border: 2px solid #00ae80;
`;

interface TermsProps {
  onClose: (agree: boolean) => void;
  type: 'service' | 'personalinfor' | 'locationinfor';
}

const Terms: FC<TermsProps> = ({ onClose, type }) => {
  const getTermsContent = () => {
    switch (type) {
      case 'service':
        return <ServiceTerms />;
      case 'personalinfor':
        return <PersonalInfoTerms />;
      case 'locationinfor':
        return <LocationInfoTerms />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <HeaderContainer>
        <CloseButton src={XButton} alt="Close" onClick={() => onClose(false)} />
      </HeaderContainer>
      <TermsTextContainer>{getTermsContent()}</TermsTextContainer>
      <ButtonContainer>
        <DisagreeButton onClick={() => onClose(false)}>동의안함</DisagreeButton>
        <AgreeButton onClick={() => onClose(true)}>동의함</AgreeButton>
      </ButtonContainer>
    </Container>
  );
};

export default Terms;
