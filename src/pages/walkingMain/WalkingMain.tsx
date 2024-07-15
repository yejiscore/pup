import React, { useRef } from 'react';
import BaseBox from '../../styles/common/BaseBox';
import {
  Header,
  Controls,
  ControlButton,
  MyLocation,
  WeatherInfo,
  StartButton,
  ImageButton,
} from '../../styles/WalkingMainStyle';
import Tmap, { TmapHandles } from '../../components/map/Tmap';
import Footer from '../../components/common/Footer';

import plusIcon from '../../assets/map/plus.png';
import minusIcon from '../../assets/map/minus.png';
import locationIcon from '../../assets/map/locationOff.png';

const WalkingMain = () => {
  const tmapRef = useRef<TmapHandles>(null);

  const handleZoomIn = () => {
    const map = (tmapRef.current as any)?.getMapInstance();
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    const map = (tmapRef.current as any)?.getMapInstance();
    if (map) {
      map.zoomOut();
    }
  };

  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (tmapRef.current) {
            tmapRef.current.updateLocation(latitude, longitude);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <BaseBox>
      <Tmap ref={tmapRef} />

      <Header>
        <WeatherInfo>
          <div>06 : 27</div>
          <div>💧</div>
          <div>30°C</div>
        </WeatherInfo>
      </Header>
      <Controls>
        <ControlButton onClick={handleZoomIn}>
          <ImageButton src={plusIcon} alt="plus" />
        </ControlButton>
        <ControlButton onClick={handleZoomOut}>
          <ImageButton src={minusIcon} alt="minus" />
        </ControlButton>
      </Controls>
      <MyLocation onClick={handleFindLocation}>
        <ImageButton src={locationIcon} alt="location" />
      </MyLocation>
      <StartButton>산책 시작하기</StartButton>
      <Footer />
    </BaseBox>
  );
};

export default WalkingMain;
