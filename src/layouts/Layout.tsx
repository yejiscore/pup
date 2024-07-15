import React, { ReactNode } from 'react';

import styled from 'styled-components';

const BaseLayoutStyled = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <BaseLayoutStyled>
      {/* <Header /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </BaseLayoutStyled>
  );
};

export default BaseLayout;
