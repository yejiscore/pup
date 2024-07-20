import React, { ReactNode } from 'react';

import styled from 'styled-components';

const BaseLayoutStyled = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
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
  background-color: gray;

  @media (max-width: 376px) {
    max-width: 100%; // 376px 이하일 때 최대 너비를 100%로 설정
    min-width: 320px; // 최소 너비를 320px로 설정
  }
`;

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayoutStyled>
      {/* <Header /> */}
      <Main>{children}</Main>
      {/* <Footer /> */}
    </BaseLayoutStyled>
  );
};

export default BaseLayout;
