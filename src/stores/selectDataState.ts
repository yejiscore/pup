import { atom } from 'recoil';

const isSelectState = atom({
  key: 'isSelectState',
  default: false,
});

export default isSelectState;
