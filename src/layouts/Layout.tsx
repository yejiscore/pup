import React, { ReactNode } from 'react';

import styled from 'styled-components';
import SharePopup from '../components/Modal/CopyIsModal';

const BaseLayoutStyled = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto; // 전체 레이아웃에 스크롤 적용
  overflow-x: hidden; // 가로 스크롤 방지
`;

const Main = styled.main`
  width: 100%;
  max-width: 480px; // 최대 너비를 480px로 설정
  min-width: 320px; // 최소 너비를 320px로 설정
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  @media (max-width: 376px) {
    max-width: 100%; // 376px 이하일 때 최대 너비를 100%로 설정
    min-width: 320px; // 최소 너비를 320px로 설정
  }
`;
const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayoutStyled>
      <Main>
        {children}
        <SharePopup />
      </Main>
    </BaseLayoutStyled>
  );
};

export default BaseLayout;
