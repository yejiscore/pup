import React, { useState, useRef, useEffect } from 'react';
import AWS from 'aws-sdk';
import axios from 'axios';
import Webcam from 'react-webcam';

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

declare global {
  interface Window {
    Tmapv2: any;
  }
}

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
  const dLon = deg2rad(lat2 - lon1);
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
  const [showStopModal, setShowStopModal] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]); // 사진 저장 배열
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tmapRef = useRef<TmapHandles>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineRef = useRef<any>(null);
  const path = useRef<any[]>([]); // 경로를 저장할 배열

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
            }

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
    const map = tmapRef.current?.getMapInstance();
    if (map) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    const map = tmapRef.current?.getMapInstance();
    if (map) {
      map.zoomOut();
    }
  };

  const handleFindLocation = () => {
    console.log('자신 위치 찾기');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (tmapRef.current) {
            tmapRef.current.updateLocation(latitude, longitude);
          }
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
    setShowStopModal(true);
  };

  const handleResume = () => {
    setIsPaused(false);
    setShowStopModal(false);
    setIsWalking(true);
  };

  const handleComplete = () => {
    setButtonText('산책 시작하기');
    setIsModalOpen(false);
    setShowStopModal(false);

    console.log('Positions:', positions);
    console.log('Distance:', distance);
    console.log('Time:', time);
    // 산책 종료 시 위치 좌표 백엔드로 전송
  };
  const handleTakePhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
          // MinIO에 업로드
          const s3 = new AWS.S3({
            accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
            secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
            endpoint: process.env.REACT_APP_MINIO_ENDPOINT,
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
          });
          const params = {
            Bucket: process.env.REACT_APP_MINIO_BUCKET_NAME || '',
            Key: `photos/${Date.now()}.jpg`,
            Body: file,
            ContentType: file.type,
          };
          s3.upload(params, (err: any, data: any) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log('Photo uploaded:', data);
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <BaseBox>
      <Tmap ref={tmapRef} />
      <WalkingHeader />
      <WalkingControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
      <WalkingMyLocation onClick={handleFindLocation} />
      <WalkingStartButton
        onClick={handleStartClick}
        isModalOpen={isModalOpen}
        buttonText={buttonText}
      />
      {isWalking && (
        <WalkingModal
          distance={distance}
          time={time}
          onStop={handleStop}
          onTakePhoto={handleTakePhoto}
          photoCount={photos.length}
        />
      )}
      {!isWalking && !isModalOpen && <Footer />}

      {!isWalking && isModalOpen && (
        <DogSelectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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

// ssh -i /Users/dobby/Documents/portfolio/launching/new_mountain/new_mountain.pem ubuntu@44.
// 202.251.90
