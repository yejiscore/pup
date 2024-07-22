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
  min-width: 320px; // 최소 너비를 320px로 설정
  border: 1px solid ${(props) => props.theme.colors.offGray};
  @media (max-width: 600px) {
    width: 100%; // 480px 이하일 때 너비를 100%로 설정
    min-width: 320px; // 최소 너비를 320px로 설정
  }
`;

export default BaseBox;
