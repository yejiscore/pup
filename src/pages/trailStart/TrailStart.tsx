import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import BaseBox from '../../styles/common/BaseBox';
import pawIcon from '../../assets/map/paw.png';
import DogSelectModal from '../../components/walkingMain/DogSelectModal';
import WalkingStartButton from '../../components/walkingMain/WalkingStartButton';
import StopIcon from '../../assets/map/stop.png';
import WalkingStopModal from '../../components/walkingMain/WalkingStopModal';
import calculateDistance from '../../utils/calculateDistance';
import WalkingControls from '../../components/walkingMain/WalkingControls';
import WalkingMyLocation from '../../components/walkingMain/WalkingMyLocation';
import useFetch from '../../hooks/useFetch';
import { formatTime } from '../../utils/formatTime';
import startTrailTimeState from '../../stores/startTrailTime';
import { IGetUserTrailType } from '../../types/getUserTrailType';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%); // 가운데 정렬
  z-index: 1; // 앞에 위치
  width: 346.16px;
  height: 63px;
`;

const BottomBox = styled.div`
  width: 100%;
  margin-top: 8px;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .stopIcon {
    background-color: inherit;
    border-radius: 100px;
    border: none;
    outline: none;
    cursor: pointer;
    /* margin-left: 20; */
  }

  .startBtn {
    box-shadow:
      0px 3px 6px 0px #37ae7f33,
      0px 10px 10px 0px #37ae7f2b,
      0px 23px 14px 0px #37ae7f1a,
      0px 41px 17px 0px #37ae7f08,
      0px 65px 18px 0px #37ae7f00;

    width: 263px;
    height: 63px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.primary[5]};
    border-radius: 100px;
    border: none;

    color: ${({ theme }) => theme.colors.white};
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -1%;
  }
`;

const TrailStart = () => {
  const { id: trailId } = useParams(); // URL 파라미터에서 id를 가져옴
  const tmapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [path, setPath] = useState<any[]>([]);
  const [marker, setMarker] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [dogsId, setDogsId] = useState<number[]>([]);
  const [showStopModal, setShowStopModal] = useState(false);
  const [isNearby, setIsNearby] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('산책 중');
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const setStartTrailTime = useSetRecoilState(startTrailTimeState);

  const navigate = useNavigate();

  const { data: trailData } = useFetch<IGetUserTrailType>(
    `/walking-trail/${trailId}`,
    `/walking-trail/${trailId}`,
    {}
  );

  const handleDogSelect = (dogId: number) => {
    setDogsId((prevIds) => {
      if (prevIds.includes(dogId)) {
        return prevIds.filter((id) => id !== dogId);
      }
      return [...prevIds, dogId];
    });
  };

  const handleStartClick = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      setStartTime(new Date()); // 산책 시작 시간 저장
    } else {
      setIsModalOpen(true);
    }
  };

  // 산책 재개
  const handleResume = () => {
    setShowStopModal(false);
  };
  // 산책 완료
  const handleComplete = () => {
    setShowStopModal(false);
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // 초 단위로 계산
      setStartTrailTime(duration);
    }
    navigate(`/trail/finish/${trailId}`);
  };

  const handleTraiLStart = () => {
    if (startTime) {
      const endTime = new Date();
      const duration = Math.floor(
        (endTime.getTime() - startTime.getTime()) / 1000
      ); // 초 단위로 계산
      setStartTrailTime(duration);
    }
    navigate(`/trail/finish/${trailId}`);
  };

  const drawLine = (arrPoint: any[], color: string = '#FF0000') => {
    new window.Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: color,
      strokeWeight: 6,
      map,
    });
  };

  useEffect(() => {
    if (tmapRef.current && !map) {
      const initMap = () => {
        const tmap = new window.Tmapv2.Map(tmapRef.current, {
          center: new window.Tmapv2.LatLng(37.5665, 126.978),
          width: '100%',
          height: '100vh',
          zoom: 15,
          zoomControl: false,
        });

        tmap.setOptions({
          mapTypeId: 'HYBRID', // 예시로 하이브리드 타입 사용
          tileUrl:
            'https://topopentile1.tmap.co.kr/tms/1.0.0/hd_tile/{z}/{x}/{y}.png?version=20220406',
        });

        setMap(tmap);
      };
      initMap();
    }
  }, [tmapRef, map]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setUserLocation(newLocation);
          setPath((prevPath) => [
            ...prevPath,
            new window.Tmapv2.LatLng(latitude, longitude),
          ]);
          setIsActive(true);
          // 현재 위치가 산책로의 마지막 좌표와 가까운지 확인
          if (trailData && trailData.data.itemList.length > 0) {
            const lastPoint =
              trailData.data.itemList[trailData.data.itemList.length - 1];
            const distanceToLastPoint = calculateDistance(
              latitude,
              longitude,
              lastPoint.lat,
              lastPoint.lng
            );
            setIsNearby(Number(distanceToLastPoint) < 0.05); // 50m 이내로 설정
            if (Number(distanceToLastPoint) < 0.05) {
              setButtonText('산책 완료');
            } else {
              setButtonText('산책 중');
            }
          }
        },
        (error) => {
          // console.error('Error getting location:', error);
        }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [trailData]);

  useEffect(() => {
    if (map && userLocation) {
      const newPoint = new window.Tmapv2.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      drawLine([...path, newPoint], '#FF0000'); // 이동 경로를 빨간색으로 표시

      // 사용자 위치에 마커 추가
      if (marker) {
        marker.setMap(null); // 이전 마커 제거
      }
      const newMarker = new window.Tmapv2.Marker({
        position: new window.Tmapv2.LatLng(userLocation.lat, userLocation.lng),
        icon: pawIcon,
        iconSize: new window.Tmapv2.Size(20, 20),
        map,
      });
      setMarker(newMarker);
      map.setCenter(
        new window.Tmapv2.LatLng(userLocation.lat, userLocation.lng)
      );
    }
  }, [userLocation]);

  useEffect(() => {
    if (map && trailData && trailData.data.itemList) {
      const routePoints = trailData.data.itemList.map(
        (item) => new window.Tmapv2.LatLng(item.lat, item.lng)
      );
      drawLine(routePoints, '#0000FF'); // 산책로를 파란색으로 표시
    }
  }, [map, trailData]);

  // 줌 인 핸들러
  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  };

  // 줌 아웃 핸들러
  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  };

  return (
    <BaseBox>
      <div ref={tmapRef} />
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={() => {}} isActive={isActive} />
      <DogSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDogSelect={handleDogSelect}
        selectedDogs={dogsId}
      />
      {isModalOpen ? (
        <WalkingStartButton
          onClick={handleStartClick}
          isModalOpen={isModalOpen}
          buttonText="산책 시작"
        />
      ) : (
        <BottomWrapper>
          <BottomBox>
            <button
              type="button"
              className="stopIcon"
              onClick={() => {
                setShowStopModal(true);
              }}
            >
              <img src={StopIcon} alt="StopIcon" width={63} height={63} />
            </button>
            <button
              type="button"
              className="startBtn"
              disabled={!isNearby}
              onClick={handleTraiLStart}
            >
              {buttonText}
            </button>
          </BottomBox>
        </BottomWrapper>
      )}
      {showStopModal && (
        <WalkingStopModal onRestart={handleResume} onStop={handleComplete} />
      )}
    </BaseBox>
  );
};

export default TrailStart;
