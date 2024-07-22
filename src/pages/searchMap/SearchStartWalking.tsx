/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-new */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import axios from 'axios';
import StartWalkingSelect from '../../components/searchMain/StartWalkingSelect';
import isSelectState from '../../stores/selectDataState';
import BaseBox from '../../styles/common/BaseBox';

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

declare const Tmapv2: any;

const SearchStartWalking = () => {
  const tmapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [path, setPath] = useState<any[]>([]);
  const [routeCalculated, setRouteCalculated] = useState<boolean>(false);
  const [marker, setMarker] = useState<any>(null);

  const dummyData = {
    lat: 37.497175,
    lng: 127.027926,
  };

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
        console.log('newLocation:', newLocation);
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
    if (map && userLocation && !routeCalculated) {
      const headers = {
        appKey: 'yEiKCREP6d1WbNkSRexoX12a38UPnI4V8pCB3sEZ', // 당신의 Tmap 앱 키로 변경하세요
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
  }, []);

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
    }
  }, [userLocation]);

  return (
    <BaseBox>
      <MapContainer ref={tmapRef} />
    </BaseBox>
  );
};

export default SearchStartWalking;
