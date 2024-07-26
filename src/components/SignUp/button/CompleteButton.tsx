// src/components/SignUp/button/CompleteButton.tsx
import React, { FC } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 336px;
  height: 63px;
  border-radius: 100px;
  background-color: #00ae80;
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
  border: none;
  outline: none;
`;

interface CompleteButtonProps {
  onClick: () => void;
}

const CompleteButton: FC<CompleteButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>등록 완료</Button>;
};

export default CompleteButton;
