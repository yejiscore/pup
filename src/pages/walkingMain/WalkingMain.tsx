import React, { useState, useRef, useEffect } from 'react';
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
import DogSelectModal from './DogSelectModal';
import WalkingModal from './WalkingModal';

import plusIcon from '../../assets/map/plus.png';
import minusIcon from '../../assets/map/minus.png';
import locationIcon from '../../assets/map/locationOff.png';
import Footer from '../../components/common/Footer';

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const WalkingMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('산책 시작하기');
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [positions, setPositions] = useState<{ lat: number; lng: number }[]>(
    []
  );
  const tmapRef = useRef<TmapHandles>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isWalking && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPositions((prevPositions) => [
              ...prevPositions,
              { lat: latitude, lng: longitude },
            ]);
            if (positions.length > 0) {
              const prevPos = positions[positions.length - 1];
              const distanceIncrement = getDistanceFromLatLonInKm(
                prevPos.lat,
                prevPos.lng,
                latitude,
                longitude
              );
              setDistance((prevDistance) => prevDistance + distanceIncrement);
            }
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWalking, isPaused, positions]);

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

  const handleStartClick = () => {
    if (buttonText === '산책 시작하기') {
      setButtonText('산책 시작');
      setIsModalOpen(true);
    } else if (buttonText === '산책 시작') {
      setIsWalking(true);
      setButtonText('산책 중지');
    }
  };

  const handleStop = () => {
    setIsWalking(false);
    setButtonText('산책 시작하기');
    setIsModalOpen(false);
  };

  const handlePauseResume = () => {
    setIsPaused((prev) => !prev);
  };

  const handleTakePhoto = () => {
    // 사진 찍기 기능 추가 (예: 카메라 API 호출)
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

      {isWalking ? (
        <WalkingModal
          distance={distance}
          time={time}
          onStop={handleStop}
          onTakePhoto={handleTakePhoto}
        />
      ) : (
        <StartButton onClick={handleStartClick} isModalOpen={isModalOpen}>
          {buttonText}
        </StartButton>
      )}
      {!isModalOpen && !isWalking && <Footer />}
      {!isWalking && (
        <DogSelectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      <WalkingModal
        distance={distance}
        time={time}
        onStop={handleStop}
        onTakePhoto={handleTakePhoto}
      />
    </BaseBox>
  );
};

export default WalkingMain;
