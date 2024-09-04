import { atom } from 'recoil';
import { v1 } from 'uuid';

export const activeTabState = atom<string>({
  key: `activeTabState/${v1()}`,
  default: '산책로',
});

export const activeSubTabState = atom<string>({
  key: `activeSubTabState/${v1()}`,
  default: '내 산책로',
});

export const isTrashIconState = atom<boolean>({
  key: `isTrashIconState/${v1()}`,
  default: false,
});

export const dateState = atom<string>({
  key: `dateState/${v1()}`,
  default: 'RECENT', // 기본값을 'recent'로 설정
});

export const deleteIdListState = atom<number[]>({
  key: `deleteIdListState/${v1()}`,
  default: [],
});
