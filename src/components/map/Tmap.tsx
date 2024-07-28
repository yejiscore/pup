/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

export interface TmapHandles {
  getMapInstance: () => any;
  updateLocation: (lat: number, lng: number) => void;
}

const Tmap = forwardRef<TmapHandles>((props, ref) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    getMapInstance: () => mapInstanceRef.current,
    updateLocation: (lat, lng) => {
      if (mapInstanceRef.current) {
        const newCenter = new (window as any).Tmapv2.LatLng(lat, lng);
        mapInstanceRef.current.setCenter(newCenter);
        if (markerRef.current) {
          markerRef.current.setPosition(newCenter);
        } else {
          markerRef.current = new (window as any).Tmapv2.Marker({
            position: newCenter,
            map: mapInstanceRef.current,
          });
        }
      }
    },
  }));

  useEffect(() => {
    if (mapRef.current) {
      const map = new (window as any).Tmapv2.Map(mapRef.current, {
        center: new (window as any).Tmapv2.LatLng(
          37.566481622437934,
          126.98502302169841
        ),
        width: '100%',
        height: '100%',
        zoom: 15,
        zoomControl: false, // 줌 컨트롤 버튼 삭제
      });
      // HTTPS로 타일 URL 변경
      map.setOptions({
        mapTypeId: 'HYBRID', // 예시로 하이브리드 타입 사용
        tileUrl:
          'https://topopentile1.tmap.co.kr/tms/1.0.0/hd_tile/{z}/{x}/{y}.png?version=20220406',
      });

      mapInstanceRef.current = map;
    }
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        // top: 0,
        // left: 0,
        zIndex: 0,
      }}
    />
  );
});

export default Tmap;
