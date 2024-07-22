import { atom } from 'recoil';
import { v1 } from 'uuid';

const uploadDataState = atom({
  key: 'uploadDataState',
  default: {
    walkingTrailId: '',
    walkingTime: '',
    walkingDistance: '',
    walkingPhotos: [] as any,
    walkingCoordinates: [] as { lat: number; lng: number }[], // 좌표 배열
  },
});

export default uploadDataState;
