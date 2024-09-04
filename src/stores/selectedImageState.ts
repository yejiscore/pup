import { atom } from 'recoil';

const selectedImageState = atom({
  key: 'selectedImageState',
  default: [] as any,
});

export default selectedImageState;
