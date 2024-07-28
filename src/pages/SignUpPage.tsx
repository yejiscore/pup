import React, { FC } from 'react';
import { styled } from 'styled-components';
import SignupForm from '../components/SignUp/SignUp';
import BaseBox from '../styles/common/BaseBox';
import Header from '../components/SignUp/common/Header';
import { Text1, Text2 } from '../components/SignUp/common/Text';

const Step = styled.div`
  width: 100%;
`;

const StepImages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StepImage = styled.img`
  width: 35px;
  height: 35px;
  margin: 0 10px;
`;

const SignupPage: FC = () => {
  return (
    <BaseBox>
      <Step>
        <Header />
        {/* <StepImages>
          <StepImage src={step1} alt="Step 1" />
          <StepImage src={step2} alt="Step 2" />
        </StepImages> */}

        <Text1>반려견과 함께 산책을 시작해볼까요?</Text1>
        <Text2>
          먼저 견주님의 정보를
          <br />
          등록해주세요.
        </Text2>
      </Step>
      <SignupForm />
    </BaseBox>
  );
};

export default SignupPage;
