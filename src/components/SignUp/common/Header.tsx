import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import XButton from '../../../assets/login/XButton.png';

const HeaderContainer = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  align-items: center;
`;

const BackButton = styled.img`
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-left: 20px;
`;

const Header: FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <HeaderContainer>
      <BackButton src={XButton} alt="Back" onClick={handleBackClick} />
    </HeaderContainer>
  );
};

export default Header;
