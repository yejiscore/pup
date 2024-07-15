import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import bagOffIcon from '../../assets/footer/bag_off.png';
import bagOnIcon from '../../assets/footer/bag_on.png';
import dogOffIcon from '../../assets/footer/dog_off.png';
import dogOnIcon from '../../assets/footer/dog_on.png';
import searchOffIcon from '../../assets/footer/search_off.png';
import searchOnIcon from '../../assets/footer/search_on.png';

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  position: absolute;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #8e8e8e;
  font-size: 12px;
`;

const NavIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-bottom: 5px;
`;

const Footer = () => {
  const location = useLocation();

  return (
    <NavBar>
      <Link to="/map" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/map' ? bagOnIcon : bagOffIcon}
            alt="내 산책지도"
          />
          <div>내 산책지도</div>
        </NavItem>
      </Link>
      <Link to="/walking_main" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/walking_main' ? dogOnIcon : dogOffIcon}
            alt="산책하기"
          />
          <div>산책하기</div>
        </NavItem>
      </Link>
      <Link to="/search" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/search' ? searchOnIcon : searchOffIcon}
            alt="산책로 찾기"
          />
          <div>산책로 찾기</div>
        </NavItem>
      </Link>
    </NavBar>
  );
};

export default Footer;
