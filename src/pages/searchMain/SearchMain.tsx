import React, { useState } from 'react';

import { useRecoilState } from 'recoil';
import SearchHeader from '../../components/searchMain/SearchHeader';
import SearchTopCom from '../../components/searchMain/SearchTopCom';
import SearchInput from '../../components/searchMain/SearchInput';
import BaseBox from '../../styles/common/BaseBox';
import SearchBottomCom from '../../components/searchMain/SearchBottomCom';
import Footer from '../../components/common/Footer';
import SearchResult from '../../components/searchMain/SearchResult';
import searchDataState from '../../stores/searchDataState';
import useFetch from '../../hooks/useFetch';

const SearchMain = () => {
  const [serachData, setSearchData] = useRecoilState(searchDataState);

  return (
    <BaseBox>
      {serachData.isSearch ? (
        <SearchResult />
      ) : (
        <>
          <SearchHeader />
          <SearchInput />
          <SearchTopCom />
          <SearchBottomCom />
          <Footer />
        </>
      )}
    </BaseBox>
  );
};

export default SearchMain;
