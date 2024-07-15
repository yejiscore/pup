import styled from 'styled-components';

const BaseBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  min-width: 376px;
  min-height: 812px;
  position: relative;
  border: 1px solid ${(props) => props.theme.colors.offGray};
`;

export default BaseBox;
