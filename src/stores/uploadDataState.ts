import { atom } from 'recoil';
import { v1 } from 'uuid';

const uploadDataState = atom({
  key: 'uploadDataState',
  default: {
    walkingTrailUid: '',
    walkingTime: '',
    walkingDistance: '',
    walkingPhotos: [] as any,
    walkingCoordinates: [] as { lat: number; lng: number }[], // 좌표 배열
    dogId: [] as any,
  },
});

export default uploadDataState;
