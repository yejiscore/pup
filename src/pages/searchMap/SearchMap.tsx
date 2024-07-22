/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-new */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import SearchMapHeader from '../../components/searchMap/SearchMapHeader';
import SearchMapInput from '../../components/searchMap/SearchMapInput';
import starIcon from '../../assets/common/star.png';
import peopleIcon from '../../assets/common/people.png';
import WalkingControls from '../../components/walkingMain/WalkingControls';
import WalkingMyLocation from '../../components/walkingMain/WalkingMyLocation';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute; // 배경으로 깔기 위해 절대 위치 지정
  top: 0;
  left: 0;
  z-index: 0; // 맨 뒤에 위치
`;

const HeaderContainer = styled.div`
  width: 100%;
  position: relative; // 헤더와 인풋을 고정하기 위해 상대 위치 지정
  z-index: 1; // 맵 위에 위치
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchMap = () => {
  const dummyData = [
    {
      id: 1,
      name: '테스트',
      address: '서울시 강남구',
      lat: 37.498085,
      lng: 127.028621,
      time: '00:12:00',
      distance: 0.5,
      rating: 4.5,
      isWoked: '0.000',
    },
    {
      id: 2,
      name: '테스트2',
      address: '서울시 강남구',
      lat: 37.496085,
      lng: 127.027621,
      time: '00:12:00',
      distance: 0.5,
      rating: 4.5,
      isWoked: '0.000',
    },
    {
      id: 3,
      name: '테스트3',
      address: '서울시 강남구',
      lat: 37.498085,
      lng: 127.027221,
      time: '00:12:00',
      distance: 0.5,
      rating: 4.5,
      isWoked: '0.000',
    },
  ];
  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(2);
  };

  const tmapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const isMapInitialized = useRef(false); // 맵 초기화 여부를 추적하는 useRef
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMapInitialized.current && tmapRef.current) {
      const initTmap = () => {
        const newMap = new window.Tmapv2.Map(tmapRef.current, {
          center: new window.Tmapv2.LatLng(37.566, 126.9784),
          width: '100%',
          height: '100%',
          zoom: 12,
          zoomControl: false, // 확대 축소 컨트롤 제거
        });

        setMap(newMap);
        isMapInitialized.current = true; // 맵이 초기화되었음을 표시

        dummyData.forEach((data) => {
          const marker = new window.Tmapv2.Marker({
            position: new window.Tmapv2.LatLng(data.lat, data.lng),
            map: newMap,
          });

          let distanceText = '';
          if (userLocation) {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              data.lat,
              data.lng
            );
            distanceText = `내 위치에서 ${distance} km`;
          }

          const content = `
            <div style="width:189px; padding:5px; cursor: pointer;" class="go-detail-button" data-id="${data.id}">
              <h4 style="font-size:14px; font-weight:400; line-height:16.71px; color:#121413;">${distanceText}</h4>
              <h5 style="font-size:14px; font-weight:400; line-height:16.71px; color: #283330;">${data.name}</h5>
              <div style="display:flex; width:100%; justify-content:space-between;">
                  <p style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">예상 시간</p>
                  <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${data.time}</p>
              </div>
              <div style="display:flex; width:100%; justify-content:space-between;">
                  <p style="font-size=14px; font-weight:400; line-height:16.71px; color:#00AE80;">거리</p>
                  <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${data.distance}km</p>
              </div>
              <div style="display:flex; width: 100%; justify-content:center; align-items:center;">
                  <img src=${starIcon} alt="rating" width="24" height="24" />
                  <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.rating}</p>
                  <img src=${peopleIcon} alt="people" width="24" height="24" />
                  <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.isWoked}</p>
              </div>

            </div>
          `;

          const infoWindow = new window.Tmapv2.InfoWindow({
            position: new window.Tmapv2.LatLng(data.lat, data.lng),
            content,
            type: 2,
            map: newMap,
          });

          marker.addListener('click', () => {
            infoWindow.open(newMap, marker);
          });
        });
      };

      initTmap();
    }
  }, [userLocation]);

  // 내 위치 찾기 핸들러
  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          if (error.code === 1) {
            console.error('Error getting location: Permission denied');
          } else if (error.code === 2) {
            console.error('Error getting location: Position unavailable');
          } else if (error.code === 3) {
            console.error('Error getting location: Timeout');
          } else {
            console.error('Error getting location:', error);
          }
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (userLocation && map) {
      const userLatLng = new window.Tmapv2.LatLng(
        userLocation.lat,
        userLocation.lng
      );
      map.setCenter(userLatLng);

      // 내 위치에 마커 추가
      new window.Tmapv2.Marker({
        position: userLatLng,
        map,
      });

      // 사용자 위치에 따라 dummyData의 content 업데이트
      dummyData.forEach((data) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          data.lat,
          data.lng
        );
        const distanceText = `내 위치에서 ${distance} km`;

        const content = `
<div style="width:189px; padding:5px; cursor: pointer;" class="go-detail-button" data-id="${data.id}">                <h4 style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">${distanceText}</h4>
                <h5 style="font-size:14px; font-weight:400; line-height:16.71px; color: #283330;">${data.name}</h5>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">예상 시간</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${data.time}</p>
            </div>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size=14px; font-weight:400; line-height:16.71px; color:#00AE80;">거리</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${data.distance}km</p>
            </div>
            <div style="display:flex; width: 100%; justify-content:center; align-items:center;">
                <img src=${starIcon} alt="rating" width="24" height="24" />
                <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.rating}</p>
                <img src=${peopleIcon} alt="people" width="24" height="24" />
                <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.isWoked}</p>
            </div>
          </div>
        `;

        const infoWindow = new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(data.lat, data.lng),
          content,
          type: 2,
          map,
        });

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(data.lat, data.lng),
          map,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      });
    }
  }, [userLocation, map]);

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

  useEffect(() => {
    const handleInfoWindowClick = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('.go-detail-button')) {
        const id = target.closest('.go-detail-button')?.getAttribute('data-id');
        if (id) {
          navigate(`/search_map/start/${id}`);
        }
      }
    };

    // 클릭 및 터치 이벤트 리스너 추가
    document.addEventListener('click', handleInfoWindowClick);
    document.addEventListener('touchstart', handleInfoWindowClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleInfoWindowClick);
      document.removeEventListener('touchstart', handleInfoWindowClick);
    };
  }, [navigate]);

  return (
    <BaseBox>
      <MapContainer ref={tmapRef} />
      <HeaderContainer>
        <SearchMapHeader />
        <SearchMapInput />
      </HeaderContainer>
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={handleFindLocation} />
    </BaseBox>
  );
};

export default SearchMap;
