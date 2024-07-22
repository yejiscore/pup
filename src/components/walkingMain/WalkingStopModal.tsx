import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128); // 연한 회색 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  width: 252px;
  height: 120px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow:
    0px 3px 7px 0px #309c7133,
    0px 13px 13px 0px #309c712b,
    0px 30px 18px 0px #309c711a,
    0px 53px 21px 0px #309c7108,
    0px 82px 23px 0px #309c7100;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;

  .title {
    font-weight: 600;
    font-size: 22px;
    line-height: 26.25px;
    color: ${(props) => props.theme.colors.darkGray};
    text-align: center;
    width: 212px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 62px;
`;

const RestartButton = styled.button`
  width: 94px;
  height: 36px;
  background: none;
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  border-radius: 100px;
  cursor: pointer;
  color: ${(props) => props.theme.colors.primary[5]};
  font-weight: 400;
  font-size: 20px;
  line-height: 23.4px;
  letter-spacing: -1%;
  text-align: center;
`;

const StopButton = styled.button`
  width: 94px;
  height: 36px;
  background: ${(props) => props.theme.colors.primary[5]};
  border-radius: 100px;
  border: none;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;
  font-weight: 400;
  font-size: 20px;
  line-height: 23.4px;
  letter-spacing: -1%;
  text-align: center;
`;

const WalkingStopModal = ({
  onRestart,
  onStop,
}: {
  onRestart: () => void;
  onStop: () => void;
}) => (
  <Overlay>
    <ModalContainer>
      <TitleWrapper>
        <h3 className="title">산책을 종료합니다.</h3>
      </TitleWrapper>
      <ButtonContainer>
        <RestartButton onClick={onRestart}>다시시작</RestartButton>
        <StopButton onClick={onStop}>종료</StopButton>
      </ButtonContainer>
    </ModalContainer>
  </Overlay>
);

export default WalkingStopModal;
