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
  position: fixed;
  bottom: 0;
  width: 100%;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  max-width: 480px; // 최대 너비를 480px로 설정
  min-width: 320px; // 최소 너비를 320px로 설정
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 10px;
  line-height: 11.7px;
  letter-spacing: -1%;
  font-weight: 600;
`;

const NavIcon = styled.img`
  width: 36px;
  height: 36px;
  margin-bottom: 5px;
`;

const NavText = styled.div<{ $active: boolean }>`
  color: ${(props) =>
    props.$active
      ? props.theme.colors.primary[5]
      : props.theme.colors.darkGray};
  font-size: 10px;
  line-height: 11.7px;
  letter-spacing: -1%;
  font-weight: 600;
`;

const Footer = () => {
  const location = useLocation();

  return (
    <NavBar>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/' ? bagOnIcon : bagOffIcon}
            alt="내 산책보드"
          />
          <NavText $active={location.pathname === '/'}>내 산책지도</NavText>
        </NavItem>
      </Link>
      <Link to="/walking_main" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/walking_main' ? dogOnIcon : dogOffIcon}
            alt="산책하기"
          />
          <NavText $active={location.pathname === '/walking_main'}>
            산책하기
          </NavText>
        </NavItem>
      </Link>
      <Link to="/search" style={{ textDecoration: 'none' }}>
        <NavItem>
          <NavIcon
            src={location.pathname === '/search' ? searchOnIcon : searchOffIcon}
            alt="산책로 찾기"
          />
          <NavText $active={location.pathname === '/search'}>
            산책로 찾기
          </NavText>
        </NavItem>
      </Link>
    </NavBar>
  );
};

export default Footer;
