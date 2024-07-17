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
  max-width: 376px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media (max-width: 376px) {
    max-width: 100%;
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
