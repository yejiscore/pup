import React, { FC } from 'react';
import styled from 'styled-components';
import plusIcon from '../../../assets/login/plus.png';

const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const ButtonContainer = styled.button`
  width: 175px;
  height: 34px;
  background-color: #66ceb3;
  color: #283330;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 16px;
`;

const Icon = styled.img`
  width: 17.48px;
  height: 17.48px;
  margin-right: 8px;
`;

const PlusButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <Container>
    <ButtonContainer onClick={onClick}>
      <Icon src={plusIcon} alt="Plus Icon" />
      반려견 추가하기
    </ButtonContainer>
  </Container>
);

export default PlusButton;
