/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const TabBarContainer = styled.div`
  display: flex;
  width: 100%;
  height: 49px;
  position: absolute;
  bottom: 0;
  background-color: white;
`;

const TabButton = styled(NavLink)`
  border: none;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  font-size: 1em;
  text-align: center;
  align-items: center;
  text-decoration: none;
  color: gray;

  &.active {
    background-color: #00ae80;
    color: white;
  }
`;

function TabBar() {
  return (
    <TabBarContainer>
      <TabButton to="/">내 산책보드</TabButton>
      <TabButton to="/walking">산책하기</TabButton>
      <TabButton to="/search">산책로 찾기</TabButton>
    </TabBarContainer>
  );
}

export default TabBar;
