import React, { useState, useRef, useEffect, ChangeEvent } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import Tmap, { TmapHandles } from '../../components/map/Tmap';
import DogSelectModal from '../../components/walkingMain/DogSelectModal';
import WalkingModal from '../../components/walkingMain/WalkingModal';
import Footer from '../../components/common/Footer';
import WalkingHeader from '../../components/walkingMain/WalkingHeader';
import WalkingControls from '../../components/walkingMain/WalkingControls';
import WalkingMyLocation from '../../components/walkingMain/WalkingMyLocation';
import WalkingStartButton from '../../components/walkingMain/WalkingStartButton';
import WalkingStopModal from '../../components/walkingMain/WalkingStopModal';
import uploadDataState from '../../stores/uploadDataState';
import useMutate from '../../hooks/useMutate';
import pawIcon from '../../assets/map/paw.png';
import useFetch from '../../hooks/useFetch';
import { userDataState } from '../../stores/auth/authState';
import { UserDataType } from '../../types/authType';
import selectedImageState from '../../stores/selectedImageState';

declare global {
  interface Window {
    Tmapv2: any;
  }
}

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
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
  const navigate = useNavigate();
  // 리코일
  const [uploadData, setUploadData] = useRecoilState(uploadDataState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);

  // 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonText, setButtonText] = useState('산책 시작하기');
  const [isWalking, setIsWalking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [positions, setPositions] = useState<{ lat: number; lng: number }[]>(
    []
  );
  const [basePosition, setBasePosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 37.514575, lng: 127.0495556 });
  const [showStopModal, setShowStopModal] = useState(false);
  const [dogsId, setDogsId] = useState<number[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [isReChangeDogSelect, setIsReChangeDogSelect] = useState(false);

  // ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tmapRef = useRef<TmapHandles>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineRef = useRef<any>(null);
  const path = useRef<any[]>([]); // 경로를 저장할 배열
  const markerRef = useRef<any>(null);

  const { data: userData, isSuccess: userDataSuccess } = useFetch<UserDataType>(
    '/user',
    '/user',
    {}
  );
  const setUserData = useSetRecoilState(userDataState);

  useEffect(() => {
    if (userDataSuccess) {
      setUserData(userData.data);
    }
  }, [userDataSuccess]);

  // 좌표 얻기
  useEffect(() => {
    if (isWalking && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      if (navigator.geolocation) {
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            setPositions((prevPositions) => {
              const newPositions = [
                ...prevPositions,
                { lat: latitude, lng: longitude },
              ];

              if (newPositions.length > 1) {
                const prevPos = newPositions[newPositions.length - 2];
                const distanceIncrement = getDistanceFromLatLonInKm(
                  prevPos.lat,
                  prevPos.lng,
                  latitude,
                  longitude
                );
                setDistance((prevDistance) => prevDistance + distanceIncrement);
              }

              return newPositions;
            });

            // Tmap 업데이트
            const map = tmapRef.current?.getMapInstance();
            if (map) {
              const latLng = new window.Tmapv2.LatLng(latitude, longitude);
              map.setCenter(latLng);

              // 파란색 선 그리기
              path.current.push(latLng);
              if (!lineRef.current) {
                lineRef.current = new window.Tmapv2.Polyline({
                  path: path.current,
                  strokeColor: '#0000FF',
                  strokeWeight: 6,
                  map,
                });
              } else {
                lineRef.current.setPath(path.current);
              }

              // 현재 위치에 마커 추가
              if (markerRef.current) {
                markerRef.current.setMap(null); // 이전 마커 제거
              }
              const newMarker = new window.Tmapv2.Marker({
                position: latLng,
                icon: pawIcon,
                iconSize: new window.Tmapv2.Size(20, 20), // 마커 이미지 크기 설정
                map,
              });
              markerRef.current = newMarker;
            }
          },
          (error) => {
            if (error.code === 1) {
              alert('브라우저 설정을 변경해주세요.');
              // console.error('Error getting location: Permission denied');
            } else if (error.code === 2) {
              alert('브라우저 설정을 변경해주세요.');
              // console.error('Error getting location: Position unavailable');
            } else if (error.code === 3) {
              alert('브라우저 설정을 변경해주세요.');
              // console.error('Error getting location: Timeout');
            } else {
              alert('브라우저 설정을 변경해주세요.');
              // console.error('Error getting location:', error);
            }
          }
        );

        return () => {
          if (watchId) {
            // watchId가 존재하면
            navigator.geolocation.clearWatch(watchId); // 위치 추적 중지
          }
        };
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
  }, [isWalking, isPaused]);

  // 내 위치 찾기
  const handleFindLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setBasePosition({ lat: latitude, lng: longitude });
          const map = tmapRef.current?.getMapInstance();
          if (map) {
            const latLng = new window.Tmapv2.LatLng(latitude, longitude);
            map.setCenter(latLng);

            // 현재 위치에 마커 추가
            if (markerRef.current) {
              markerRef.current.setMap(null); // 이전 마커 제거
            }
            const newMarker = new window.Tmapv2.Marker({
              position: latLng,
              icon: pawIcon,
              iconSize: new window.Tmapv2.Size(20, 20), // 마커 이미지 크기 설정
              map,
            });
            setIsActive(true);
            markerRef.current = newMarker;
          }
        },
        (error) => {
          if (error.code === 1) {
            alert('브라우저 설정을 변경해주세요.');
            // console.error('Error getting location: Permission denied');
          } else if (error.code === 2) {
            alert('브라우저 설정을 변경해주세요.');
            // console.error('Error getting location: Position unavailable');
          } else if (error.code === 3) {
            alert('브라우저 설정을 변경해주세요.');
            // console.error('Error getting location: Timeout');
          } else {
            alert('브라우저 설정을 변경해주세요.');
            // console.error('Error getting location:', error);
          }
        }
      );
    } else {
      // alert('Geolocation is not supported by this browser.');
    }
  };

  const { mutate: createWalkingTrail } = useMutate(
    'walkingTrail',
    '/walking-trail',
    'post'
  );

  // 줌
  const handleZoomIn = () => {
    const map = tmapRef.current?.getMapInstance();
    if (map) {
      map.zoomIn();
    }
  };

  // 아웃
  const handleZoomOut = () => {
    const map = tmapRef.current?.getMapInstance();
    if (map) {
      map.zoomOut();
    }
  };

  // 산책 시작
  const handleStartClick = () => {
    if (buttonText === '산책 시작하기') {
      setButtonText('산책 시작');
      setIsModalOpen(true);
    } else if (buttonText === '산책 시작') {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;

          createWalkingTrail(
            {
              dogIdList: dogsId,
              lat: latitude,
              lng: longitude,
            },
            {
              onSuccess: (data) => {
                setUploadData((prevData) => ({
                  ...prevData,
                  walkingTrailUid: data.data,
                  dogId: dogsId,
                }));
              },
              onError: (error) => {
                // console.error('Error creating walking trail:', error);
              },
            }
          );
        });
      }
      setIsWalking(true);
      setButtonText('산책 중지');
    }
  };

  // 산책 중지
  const handleStop = () => {
    setIsWalking(false);
    setShowStopModal(true);
  };

  // 산책 재개
  const handleResume = () => {
    setIsPaused(false);
    setShowStopModal(false);
    setIsWalking(true);
  };

  // 산책 완료
  const handleComplete = () => {
    setUploadData((prevData) => ({
      ...prevData,
      walkingPhotos: uploadData.walkingPhotos,
      walkingDistance: distance.toString(),
      walkingTime: time.toString(),
      walkingCoordinates: positions,
    }));

    setButtonText('산책 시작하기');
    setIsModalOpen(false);
    setShowStopModal(false);
    navigate('/walking_main/report');
  };

  // 사진 찍기
  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // 수정된 handleFileChange 함수
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadData((prevData) => ({
        ...prevData,
        walkingPhotos: [...prevData.walkingPhotos, file],
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setSelectedImage((prevData: any) => [
            ...prevData,
            reader.result as string,
          ]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDogSelect = (dogId: number) => {
    setDogsId((prevIds) => {
      if (prevIds.includes(dogId)) {
        return prevIds.filter((id) => id !== dogId);
      }
      return [...prevIds, dogId];
    });
  };

  const dogChangeId = () => {
    setIsReChangeDogSelect(true);
    setDogsId([]);
    setButtonText('산책으로 돌아가기');
  };

  return (
    <BaseBox>
      <Tmap ref={tmapRef} />
      <WalkingHeader basePosition={basePosition} />
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={handleFindLocation} isActive={isActive} />
      <WalkingStartButton
        onClick={handleStartClick}
        isModalOpen={isModalOpen}
        buttonText={buttonText}
        onClose={() => setIsReChangeDogSelect(false)}
        dogsId={dogsId}
      />
      {isWalking && !isReChangeDogSelect && (
        <WalkingModal
          distance={distance}
          time={time}
          onStop={handleStop}
          onTakePhoto={handleTakePhoto}
          photoCount={selectedImage.length}
          dogChange={dogChangeId}
        />
      )}
      {!isWalking && !isModalOpen && <Footer />}

      {!isWalking && isModalOpen && (
        <DogSelectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDogSelect={handleDogSelect}
          selectedDogs={dogsId}
          rechange={false}
        />
      )}

      {isReChangeDogSelect && (
        <DogSelectModal
          isOpen={isReChangeDogSelect}
          onClose={() => setIsReChangeDogSelect(false)}
          onDogSelect={handleDogSelect}
          selectedDogs={dogsId}
          rechange
        />
      )}

      {showStopModal && (
        <WalkingStopModal onRestart={handleResume} onStop={handleComplete} />
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </BaseBox>
  );
};

export default WalkingMain;
