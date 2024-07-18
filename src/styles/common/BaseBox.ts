import styled from 'styled-components';

const BaseBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 376px;
  border: 1px solid ${(props) => props.theme.colors.offGray};

  @media (max-width: 376px) {
    min-width: 100%;
  }
`;

export default BaseBox;
