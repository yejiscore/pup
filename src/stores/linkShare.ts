import { atom } from 'recoil';

const linkShareState = atom({
  key: 'linkShareState',
  default: {
    isLinkShare: false,
    shareUrl: '', // Add shareUrl to the state
  },
});

export default linkShareState;
