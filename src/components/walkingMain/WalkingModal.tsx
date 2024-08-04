import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import cameraIcon from '../../assets/map/camera.png';
import stopIcon from '../../assets/map/stop.png';
import dogWalkingPic from '../../assets/map/dogwalkingpic.png';
import useFetch from '../../hooks/useFetch';
import { userDataState } from '../../stores/auth/authState';

const ModalContainer = styled.div`
  width: 336px;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow:
    0px 3px 7px 0px #309c7133,
    0px 13px 13px 0px #309c712b,
    0px 30px 18px 0px #309c711a,
    0px 53px 21px 0px #309c7108,
    0px 82px 23px 0px #309c7100;
  height: 214px;
  position: absolute;
  bottom: 50px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 98px;
  justify-content: space-between;
  align-items: center;
  justify-content: space-between;
  align-items: center;

  .title {
    font-weight: 400;
    font-size: 20px;
    line-height: 23.87px;
    color: ${(props) => props.theme.colors.darkGray};
    text-align: center;
    width: 115px;
  }
`;

const HeaderBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 14px;
`;

const PhotoCount = styled.span`
  font-size: 20px;
  line-height: 23.4px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary[5]};
`;

const Img = styled.img`
  margin-right: 13px;
`;

const CameraButton = styled.button`
  background: none;
  border: none;
  margin-left: 11px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 116px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  width: 112px;

  .title {
    font-size: 20px;
    font-weight: 400;
    line-height: 23.87px;
    color: ${(props) => props.theme.colors.primary[5]};
  }

  .content {
    font-size: 20px;
    font-weight: 700;
    line-height: 23.87px;
    color: ${(props) => props.theme.colors.darkGray};
  }
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
  photoCount,
  dogChange,
}: {
  distance: number;
  time: number;
  onStop: () => void;
  onTakePhoto: () => void;
  photoCount: number;
  dogChange: () => void;
}) => {
  const userData = useRecoilValue(userDataState);

  const formatTime = (time: number) => {
    const hours = String(Math.floor(time / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const formatNumber = (num: number): string => {
    return num.toString().padStart(3, '0');
  };

  const formatDistance = (distanceNum: number): string => {
    return distanceNum.toFixed(2).padStart(5, '0');
  };

  const [imgSrc, setImgSrc] = useState(userData.profile);
  const handleError = () => {
    setImgSrc(dogWalkingPic);
  };

  return (
    <ModalContainer>
      <Header>
        <HeaderBox>
          <Img
            src={imgSrc}
            alt="userProfile"
            width={58}
            height={58}
            onError={handleError}
            onClick={dogChange}
          />
          <span className="title">즐겁게 산책중!</span>
        </HeaderBox>
        <HeaderBox>
          <PhotoCount>{formatNumber(photoCount)}</PhotoCount>
          <CameraButton onClick={onTakePhoto}>
            <img src={cameraIcon} alt="camera" width={40} height={40} />
          </CameraButton>
        </HeaderBox>
      </Header>
      <Info>
        <InfoItem>
          <div className="title">거리</div>
          <div className="content">{formatDistance(distance)} km</div>
        </InfoItem>
        <StopButton onClick={onStop}>
          <img src={stopIcon} alt="stop" width={76} height={76} />
        </StopButton>
        <InfoItem>
          <div className="title">시간</div>
          <div className="content">{formatTime(elapsedTime)}</div>
        </InfoItem>
      </Info>
    </ModalContainer>
  );
};

export default WalkingModal;
