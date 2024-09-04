import styled from 'styled-components';

const BaseBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: #edf9f6;
  max-width: 100%; // 기본적으로 너비를 100%로 설정
  min-width: 320px; // 최소 너비를 320px로 설정
<<<<<<< HEAD
=======
  /* border: 1px solid black; */
>>>>>>> feature/develop

  @media (max-width: 480px) {
    width: 100%; // 480px 이하일 때 너비를 100%로 설정
    min-width: 320px; // 최소 너비를 320px로 설정
  }
`;

export default BaseBox;
