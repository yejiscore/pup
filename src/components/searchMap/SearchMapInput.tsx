import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/common/search.png';
import mapIcon from '../../assets/common/map.png';
import callListIcon from '../../assets/common/callList.png';
import searchDataState from '../../stores/searchDataState';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  justify-content: center;
  background-color: #ffffff80;
  padding-bottom: 10px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  min-width: 299px;
  margin: 0 20px;
`;

const SearchInputCom = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  line-height: 18.72px;
  &::placeholder {
    color: ${(props) => props.theme.colors.offGray};
    font-size: 12px;
    font-weight: 400;
    line-height: 14.32px;
  }
  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
`;

const SearchMapInput = ({
  name,
  onChangeSearch,
}: {
  name: string;
  onChangeSearch: () => void;
}) => {
  const navigate = useNavigate();

  const onGoText = () => {
    navigate('/search');
  };
  return (
    <SearchBarContainer>
      <InputContainer>
        <Icon src={searchIcon} alt="search" />
        <SearchInputCom
          placeholder="원하는 산책로의 이름 또는 현재 지역을 검색해 보세요"
          value={name}
          onChange={onChangeSearch}
        />
      </InputContainer>
      <Icon src={callListIcon} alt="callListIcon" onClick={onGoText} />
    </SearchBarContainer>
  );
};

export default SearchMapInput;
