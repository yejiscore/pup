// src/components/Detail/StartButton.tsx
import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 90%;
  height: 63px;
  padding: 23px 103px;
  gap: 10px;
  border-radius: 100px;
  background-color: #00ae80;
  color: white;
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20px;

  &:hover {
    opacity: 1;
  }
`;

function StartButton() {
  return <Button>산책 시작하기</Button>;
}

export default StartButton;
