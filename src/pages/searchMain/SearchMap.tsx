import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import BaseBox from '../../styles/common/BaseBox';
import SearchMapHeader from '../../components/searchMap/SearchMapHeader';
import SearchMapInput from '../../components/searchMap/SearchMapInput';
import starIcon from '../../assets/common/star.png';
import peopleIcon from '../../assets/common/people.png';
import WalkingControls from '../../components/walkingMain/WalkingControls';
import WalkingMyLocation from '../../components/walkingMain/WalkingMyLocation';
import useFetch from '../../hooks/useFetch';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import {
  formatDistance,
  formatRating,
  formatReviewCount,
  formatTime,
} from '../../utils/formatTime';
import onSpot from '../../assets/map/onSpot.png';
import offSpot from '../../assets/map/offSpot.png';
import selectTrailState from '../../stores/selectTrail';
import searchIcon from '../../assets/common/search.png';
import callListIcon from '../../assets/common/callList.png';

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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  justify-content: center;
  background-color: #ffffff80;
  padding-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  min-width: 299px;
  margin: 0 20px;
`;

const SearchInputCom = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  line-height: 18.72px;
  &::placeholder {
    color: ${(props) => props.theme.colors.offGray};
    font-size: 12px;
    font-weight: 400;
    line-height: 14.32px;
  }
  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

const WalkingStartButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  border: none;
  border-radius: 1000px;
  width: 300px;
  height: 63px;
  cursor: pointer;
  box-shadow:
    0px 3px 6px 0px #37ae7f33,
    0px 10px 10px 0px #37ae7f2b,
    0px 23px 14px 0px #37ae7f1a,
    0px 41px 17px 0px #37ae7f08,
    0px 65px 18px 0px #37ae7f00;
`;

const SearchMap = () => {
  const [baseName, setBaseName] = useState('');
  const [name, setName] = useState('');
  const selectTrail = useRecoilValue(selectTrailState);
  const type = 'RECENT';
  const navigate = useNavigate();

  useEffect(() => {
    const selectedName = selectTrail.name;
    if (selectedName) {
      setName(selectedName);
    }
  }, []);

  const { data: trailData } = useFetch<ResIUserTrailLists>(
    `[trailData/search/${name}${type}]`,
    '/walking-trail/search',
    {
      name,
      type,
    }
  );

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseName(e.target.value);
  };

  const onSearch = () => {
    setName(baseName);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const onGoText = () => {
    navigate('/search');
  };

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
  const [markers, setMarkers] = useState<any[]>([]);
  const [infoWindows, setInfoWindows] = useState<any[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const isMapInitialized = useRef(false); // 맵 초기화 여부를 추적하는 useRef

  const handleInfoWindowClick = (event: Event) => {
    const target = event.target as HTMLElement;
    const goDetailButton = target.closest('.go-detail-button');
    if (goDetailButton) {
      const id = goDetailButton.getAttribute('data-id');
      if (id) {
        navigate(`/trail/select/${id}`);
      }
    }
  };

  useEffect(() => {
    if (!isMapInitialized.current && tmapRef.current) {
      const initTmap = () => {
        const newMap = new window.Tmapv2.Map(tmapRef.current, {
          center: new window.Tmapv2.LatLng(37.566, 126.9784),
          width: '100%',
          height: '100%',
          zoom: 17,
          zoomControl: false, // 확대 축소 컨트롤 제거
        });

        setMap(newMap);
        isMapInitialized.current = true; // 맵이 초기화되었음을 표시
      };

      initTmap();
    }
  }, []);

  useEffect(() => {
    if (map && trailData) {
      // 기존 마커와 정보 창 제거
      markers.forEach((marker) => marker.setMap(null));
      infoWindows.forEach((infoWindow) => infoWindow.setMap(null));

      const newMarkers: any[] = [];
      const newInfoWindows: any[] = [];

      trailData.data.forEach((data) => {
        const initailLat =
          data.itemList.length > 0 ? data.itemList[0].lat : 37.3971;
        const initialLng =
          data.itemList.length > 0 ? data.itemList[0].lng : 127.0279;
        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(initailLat, initialLng),
          map,
          icon: offSpot, // 초기 마커 아이콘 설정
        });

        let distanceText = '';
        if (userLocation) {
          const distance = calculateDistance(
            userLocation.lat,
            userLocation.lng,
            initailLat,
            initialLng
          );
          distanceText = `내 위치에서 ${distance} km`;
        }

        const content = `
          <div style="width:189px; padding:5px; cursor: pointer;" class="go-detail-button" data-id="${data.walkingTrailUid}">
            <h4 style="font-size:14px; font-weight:400; line-height:16.71px; color:#121413;">${distanceText}</h4>
            <h5 style="font-size:14px; font-weight:400; line-height:16.71px; color: #283330;">${data.name}</h5>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">예상 시간</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${formatTime(data.time)}</p>
            </div>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size=14px; font-weight:400; line-height:16.71px; color:#00AE80;">거리</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${formatDistance(data.distance)}km</p>
            </div>
            <div style="display:flex; width: 100%; justify-content:center; align-items:center;">
                <img src=${starIcon} alt="rating" width="24" height="24" />
              <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.rating ? formatRating(String(data.rating)) : '0.0'}</p>
                <img src=${peopleIcon} alt="people" width="24" height="24" />
                <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${formatReviewCount(data.reviewCount)}</p>
            </div>
          </div>
        `;

        const infoWindow = new window.Tmapv2.InfoWindow({
          position: new window.Tmapv2.LatLng(initailLat, initialLng),
          content,
          type: 2,
          map,
        });

        marker.addListener('click', () => {
          navigate(`/trail/select/${data.walkingTrailUid}`);
        });

        newMarkers.push(marker);
        newInfoWindows.push(infoWindow);
      });

      // 새로운 마커와 정보 창을 상태에 저장
      setMarkers(newMarkers);
      setInfoWindows(newInfoWindows);
    }
  }, [trailData, map, userLocation]);

  // 선택된 산책로 위치로 이동
  useEffect(() => {
    if (map && selectTrail && selectTrail.lat !== 0 && selectTrail.lng !== 0) {
      const selectedLocation = new window.Tmapv2.LatLng(
        selectTrail.lat,
        selectTrail.lng
      );
      map.setCenter(selectedLocation);
    }
  }, [map, selectTrail]);

  // 내 위치 찾기 핸들러
  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsActive(true);
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

      const initailLat = trailData?.data[0].itemList[0].lat || 37.3971;
      const initialLng = trailData?.data[0].itemList[0].lng || 127.0279;

      // 사용자 위치에 따라 dummyData의 content 업데이트
      trailData?.data.forEach((data) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          initailLat,
          initialLng
        );
        const distanceText = `내 위치에서 ${distance} km`;

        const content = `
        <div style="width:189px; padding:5px; cursor: pointer;" class="go-detail-button" data-id="${data.walkingTrailUid}">                
    <h4 style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">${distanceText}</h4>
                <h5 style="font-size:14px; font-weight:400; line-height:16.71px; color: #283330;">${data.name}</h5>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size:14px; font-weight:400; line-height:16.71px; color:#00AE80;">예상 시간</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${formatTime(data.time)}</p>
            </div>
            <div style="display:flex; width:100%; justify-content:space-between;">
                <p style="font-size=14px; font-weight:400; line-height:16.71px; color:#00AE80;">거리</p>
                <p style="font-size:14px; font-weight:600; line-height:16.38px; color:#283330;">${formatDistance(data.distance)}km</p>
            </div>
            <div style="display:flex; width: 100%; justify-content:center; align-items:center;">
                <img src=${starIcon} alt="rating" width="24" height="24" />
                <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${data.rating ? formatRating(String(data.rating)) : '0.0'}</p>
                <img src=${peopleIcon} alt="people" width="24" height="24" />
                <p style="font-size:12px; font-weight:400; line-height:14.32px; color:#283330;">${formatReviewCount(data.reviewCount)}</p>
            </div>
          </div>
        `;

        const marker = new window.Tmapv2.Marker({
          position: new window.Tmapv2.LatLng(initailLat, initialLng),
          map,
          icon: offSpot, // 초기 마커 아이콘 설정
        });

        marker.addListener('click', () => {
          navigate(`/trail/select/${data.walkingTrailUid}`);
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
    // 클릭 및 터치 이벤트 리스너 추가
    document.addEventListener('click', handleInfoWindowClick);
    document.addEventListener('touchstart', handleInfoWindowClick);
    // 휴대폰에서 터치 이벤트 리스너 추가
    document.addEventListener('touchend', handleInfoWindowClick);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('click', handleInfoWindowClick);
      document.removeEventListener('touchstart', handleInfoWindowClick);
      document.removeEventListener('touchend', handleInfoWindowClick);
    };
  }, [navigate]);

  const onClickDetailTrail = () => {
    navigate(`/trail/select/${selectTrail.selectId}`);
  };

  return (
    <BaseBox>
      <MapContainer ref={tmapRef} />
      <HeaderContainer>
        <SearchMapHeader />
        <SearchBarContainer>
          <InputContainer>
            <Icon src={searchIcon} alt="search" />
            <SearchInputCom
              placeholder="원하는 산책로의 이름 또는 현재 지역을 검색해 보세요"
              value={baseName}
              onChange={onChangeSearch}
              onKeyDown={onKeyDown}
            />
          </InputContainer>
          <Icon src={callListIcon} alt="callListIcon" onClick={onGoText} />
        </SearchBarContainer>
      </HeaderContainer>
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={handleFindLocation} isActive={isActive} />

      <WalkingStartButton onClick={onClickDetailTrail}>
        위치 확인
      </WalkingStartButton>
    </BaseBox>
  );
};

export default SearchMap;
