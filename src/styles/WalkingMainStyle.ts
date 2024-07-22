import styled from 'styled-components';

// 상단의 시간, 날씨, 온도 표시
export const Header = styled.div`
  width: 100%;
  width: 336px;
  height: 48px;
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  position: absolute;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0px 3px 7px 0px #0000001a;
`;

export const WeatherInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

// +, - 버튼과 위치 버튼
export const Controls = styled.div`
  position: absolute;
  top: 208px;
  right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow:
    1px 0px 1px 0px #0000001a,
    2px 0px 2px 0px #00000017,
    5px 0px 3px 0px #0000000d,
    9px 0px 4px 0px #00000003,
    14px 0px 4px 0px #00000000;
  border-radius: 100px;
  background: #ffffff;
  width: 48px;
  height: 84px;
  justify-content: center;
`;

export const ControlButton = styled.button`
  border: none;
  background-color: transparent;
  width: 26px;
  height: 26px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 하단의 "산책 시작하기" 버튼
export const MyLocation = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 332px;
  right: 5%;
  width: 48px;
  height: 48px;
  padding: 4px;
  gap: 10px;
  border-radius: 100px;
  opacity: 0px;
  border: none;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow:
    1px 0px 1px 0px #0000001a,
    2px 0px 2px 0px #00000017,
    5px 0px 3px 0px #0000000d,
    9px 0px 4px 0px #00000003,
    14px 0px 4px 0px #00000000;
  cursor: pointer;
`;

export const StartButton = styled.button<{ isModalOpen: boolean }>`
  position: absolute;
  width: 335px;
  height: 63px;
  bottom: ${(props) => (props.isModalOpen ? '50px' : '109px')};
  padding: 23px 103px;
  gap: 10px;
  border-radius: 100px;
  opacity: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  box-shadow:
    0px 3px 6px 0px #37ae7f33,
    0px 10px 10px 0px #37ae7f2b,
    0px 23px 14px 0px #37ae7f1a,
    0px 41px 17px 0px #37ae7f08,
    0px 65px 18px 0px #37ae7f00;
  cursor: pointer;
`;

export const ImageButton = styled.img`
  width: 26px;
  height: 26px;
`;
