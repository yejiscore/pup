/* eslint-disable no-shadow */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import StopIcon from '../../assets/map/stop.png';
import WalkingStopModal from '../../components/walkingMain/WalkingStopModal';
import calculateDistance from '../../utils/calculateDistance';
import WalkingControls from '../../components/walkingMain/WalkingControls';
import WalkingMyLocation from '../../components/walkingMain/WalkingMyLocation';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; // 배경으로 깔기 위해 절대 위치 지정
  top: 0;
  left: 0;
  z-index: 0; // 맨 뒤에 위치
`;

const BottomWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%); // 가운데 정렬
  z-index: 1; // 앞에 위치
  width: 346.16px;
  height: 181px;
`;

const TopBox = styled.div`
  width: 100%;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  box-shadow:
    0px 2px 4px 0px #37ae7f33,
    0px 7px 7px 0px #37ae7f2b,
    0px 15px 9px 0px #37ae7f1a,
    0px 27px 11px 0px #37ae7f08,
    0px 43px 12px 0px #37ae7f00;

  .title {
    font-size: 20px;
    font-weight: 400;
    line-height: 23.87px;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-left: 20px;
    margin-bottom: 10px;
  }
  .infoWrapper {
    display: flex;
    margin-left: 20px;
  }

  .info {
    font-size: 20px;
    font-weight: 400;
    line-height: 23.87px;
    color: ${({ theme }) => theme.colors.primary[5]};
    margin-right: 13px;
  }

  .distance {
    font-size: 20px;
    font-weight: 700;
    line-height: 23.87px;
  }
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

declare const Tmapv2: any;

const SearchStartWalking = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const navigate = useNavigate();

  //   const { data: trailData } = useFetch(
  //     `/walking-trail/${id}`,
  //     `/walking-trail/${id}`,
  //     {}
  //   );

  const dummyData = {
    lat: 37.497175,
    lng: 127.027926,
  };

  const tmapRef = useRef<HTMLDivElement | null | any>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [path, setPath] = useState<any[]>([]);
  const [routeCalculated, setRouteCalculated] = useState<boolean>(false);
  const [marker, setMarker] = useState<any>(null);
  const [distanceToDestination, setDistanceToDestination] = useState<
    string | null
  >(null);
  const [isNearby, setIsNearby] = useState<boolean>(false);

  const drawLine = (arrPoint: any[], color: string = '#FF0000') => {
    new Tmapv2.Polyline({
      path: arrPoint,
      strokeColor: color,
      strokeWeight: 6,
      map,
    });
  };

  const drawPath = (arrPath: any[]) => {
    drawLine(arrPath, '#FF0000'); // 이동 경로를 빨간색으로 표시
  };

  useEffect(() => {
    if (tmapRef.current && !map) {
      const initMap = () => {
        const tmap = new Tmapv2.Map(tmapRef.current, {
          center: new Tmapv2.LatLng(37.5665, 126.978),
          width: '100%',
          height: '100%',
          zoom: 15,
          zoomControl: false, // 줌 컨트롤 버튼 삭제
        });
        setMap(tmap);
      };
      initMap();
    }
  }, [tmapRef, map]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setUserLocation(newLocation);
        setPath((prevPath) => [
          ...prevPath,
          new Tmapv2.LatLng(latitude, longitude),
        ]);
      });
      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    console.log('map:', map);
    console.log('userLocation:', userLocation);
    console.log('routeCalculated:', routeCalculated);
    if (map && userLocation && !routeCalculated) {
      const headers = {
        appKey: process.env.REACT_APP_TMAP_APP_KEY,
      };
      console.log('userLocation:', userLocation);
      console.log('실행');
      axios
        .post(
          'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result',
          {
            startX: userLocation.lng.toString(),
            startY: userLocation.lat.toString(),
            endX: dummyData.lng.toString(),
            endY: dummyData.lat.toString(),
            reqCoordType: 'WGS84GEO',
            resCoordType: 'EPSG3857',
            startName: '출발지',
            endName: '도착지',
          },
          { headers }
        )
        .then((response) => {
          const resultData = response.data.features;
          const drawInfoArr = [];

          for (const feature of resultData) {
            const { geometry } = feature;
            if (geometry.type === 'LineString') {
              for (const coordinate of geometry.coordinates) {
                const latlng = new Tmapv2.Point(coordinate[0], coordinate[1]);
                const convertPoint =
                  new Tmapv2.Projection.convertEPSG3857ToWGS84GEO(latlng);
                const convertChange = new Tmapv2.LatLng(
                  convertPoint._lat,
                  convertPoint._lng
                );
                drawInfoArr.push(convertChange);
              }
            }
          }
          drawLine(drawInfoArr, '#0000FF'); // 초기 경로를 파란색으로 표시
          setRouteCalculated(true);
        })
        .catch((error) => {
          console.error('경로 데이터를 가져오는 중 오류 발생:', error);
        });
    }
  }, [map && userLocation && !routeCalculated]);

  useEffect(() => {
    if (map && userLocation) {
      const newPoint = new Tmapv2.LatLng(userLocation.lat, userLocation.lng);
      drawPath([...path, newPoint]); // 이동 경로를 빨간색으로 표시

      // 사용자 위치에 마커 추가
      if (marker) {
        marker.setMap(null); // 이전 마커 제거
      }
      const newMarker = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(userLocation.lat, userLocation.lng),
        icon: 'https://tmapapi.tmapmobility.com/upload/tmap/marker/pin_r_m_s.png',
        map,
      });
      setMarker(newMarker);
      map.setCenter(new Tmapv2.LatLng(userLocation.lat, userLocation.lng));

      // 목적지까지의 거리 계산
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        dummyData.lat,
        dummyData.lng
      );
      setDistanceToDestination(distance);
      // 거리가 0.05km 이하일 때 (즉, 50미터 이내일 때)
      if (Number(distance) <= 0.05) {
        setIsNearby(true);
      } else {
        setIsNearby(false);
      }
    }
  }, [userLocation]);

  const [showStopModal, setShowStopModal] = useState(false);
  // 산책 재개
  const handleResume = () => {
    setShowStopModal(false);
  };
  // 산책 완료
  const handleComplete = () => {
    setShowStopModal(false);
    // navigate('/walking_main/report');
  };

  const handleTraiLStart = () => {
    console.log('산책 시작');
    navigate(`/trail/startTrail/${id}`);
  };

  useEffect(() => {
    if (userLocation) {
      console.log('userLocation changed:', userLocation);
      if (map) {
        const newCenter = new Tmapv2.LatLng(userLocation.lat, userLocation.lng);
        map.setCenter(newCenter);
      }
    }
  }, [userLocation]);

  // 줌
  const handleZoomIn = () => {
    if (map) {
      map.zoomIn();
    }
  };

  // 아웃
  const handleZoomOut = () => {
    if (map) {
      map.zoomOut();
    }
  };

  return (
    <BaseBox>
      <MapContainer ref={tmapRef} />
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={() => {}} isActive />

      <BottomWrapper>
        <TopBox>
          <span className="title">시작 지점으로 이동하기</span>
          <div className="infoWrapper">
            <span className="info">시작 지점까지</span>
            <span className="distance">
              {distanceToDestination !== null ? distanceToDestination : '00.00'}
              km
            </span>
          </div>
        </TopBox>
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
            산책시작
          </button>
        </BottomBox>
      </BottomWrapper>
      {showStopModal && (
        <WalkingStopModal onRestart={handleResume} onStop={handleComplete} />
      )}
    </BaseBox>
  );
};

export default SearchStartWalking;

// 37.497175
// 127.027926
