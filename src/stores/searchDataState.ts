import { atom } from 'recoil';

const searchDataState = atom({
  key: 'searchDataState',
  default: {
    isSearch: false,
    search: '',
    page: 1,
    limit: 10,
    total: 0,
    data: [],
    isRefresh: false,
  },
});

export default searchDataState;
