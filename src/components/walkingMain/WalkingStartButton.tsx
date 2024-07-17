import React from 'react';
import styled from 'styled-components';

interface StartButtonProps {
  onClick: () => void;
  isModalOpen: boolean;
  buttonText: string;
}
const Button = styled.button<{ $isModalOpen: boolean }>`
  position: absolute;
  width: 335px;
  height: 63px;
  bottom: ${(props) => (props.$isModalOpen ? '50px' : '109px')};
  padding: 23px 103px;
  gap: 10px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  box-shadow:
    0px 3px 6px 0px #37ae7f33,
    0px 10px 10px 0px #37ae7f2b,
    0px 23px 14px 0px #37ae7f1a,
    0px 41px 17px 0px #37ae7f08,
    0px 65px 18px 0px #37ae7f00;
  cursor: pointer;
`;

const WalkingStartButton = ({
  onClick,
  isModalOpen,
  buttonText,
}: {
  onClick: () => void;
  isModalOpen: boolean;
  buttonText: string;
}) => (
  <Button onClick={onClick} $isModalOpen={isModalOpen}>
    {buttonText}
  </Button>
);

export default WalkingStartButton;
