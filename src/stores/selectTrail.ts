import { atom } from 'recoil';

const selectTrailState = atom({
  key: 'selectTrailState',
  default: {
    selectId: '',
    name: '',
    lat: 0,
    lng: 0,
  },
});

export default selectTrailState;
