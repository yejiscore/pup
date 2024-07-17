import React from 'react';
import styled from 'styled-components';
import cameraIcon from '../../assets/map/camera.png';
import stopIcon from '../../assets/map/stop.png';

const ModalContainer = styled.div`
  width: 336px;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow:
    0px 3px 7px 0px #309c7133,
    0px 13px 13px 0px #309c712b,
    0px 30px 18px 0px #309c711a,
    0px 53px 21px 0px #309c7108,
    0px 82px 23px 0px #309c7100;
  height: 216px;
  position: absolute;
  bottom: 50px;
  border-radius: 18px;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const CameraButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
`;

const StopButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 20px 0;
`;

const WalkingModal = ({
  distance,
  time: elapsedTime,
  onStop,
  onTakePhoto,
}: {
  distance: number;
  time: number;
  onStop: () => void;
  onTakePhoto: () => void;
}) => {
  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <ModalContainer>
      <Header>
        <Text>즐겁게 산책중!</Text>
        <div>000</div>
        <CameraButton onClick={onTakePhoto}>
          <img src={cameraIcon} alt="camera" width={30} height={30} />
        </CameraButton>
      </Header>
      <Info>
        <InfoItem>
          <div>거리</div>
          <div>{distance.toFixed(2)} km</div>
        </InfoItem>
        <StopButton onClick={onStop}>
          <img src={stopIcon} alt="stop" width={30} height={30} />
        </StopButton>
        <InfoItem>
          <div>시간</div>
          <div>{formatTime(elapsedTime)}</div>
        </InfoItem>
      </Info>
    </ModalContainer>
  );
};

export default WalkingModal;
