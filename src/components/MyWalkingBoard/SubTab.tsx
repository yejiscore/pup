/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { useAppContext } from '../../context/AppContext';

const SubTabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 49px;
  justify-content: flex-start;
  margin-left: 10px;
  position: absolute;
  top: 98px;
`;

const SubTabButton = styled.button<{ '$data-active'?: string }>`
  border: none;
  cursor: pointer;
  font-size: 18px;
  /* weight: 100px; */
  height: 49px;
  color: ${(props) =>
    props['$data-active'] === 'true' ? '#00AE80' : '#B7CAC4'};
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  gap: 10px;
  font-weight: bold;
`;

interface SubTabProps {
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

function SubTab({ activeSubTab, setActiveSubTab }: SubTabProps) {
  const { filter } = useAppContext();
  const {
    data: likeWalkingBoardData,
    error,
    isLoading,
  } = useFetch(
    'likeData',
    'walking-trail/like',
    {
      type: filter === ('전체' || '최신순') ? 'RECENT' : 'POPULAR',
    },
    activeSubTab === '찜한 산책로'
  );

  return (
    <SubTabContainer>
      <SubTabButton
        $data-active={activeSubTab === '내 산책로' ? 'true' : 'false'}
        onClick={() => setActiveSubTab('내 산책로')}
      >
        내 산책로
      </SubTabButton>
      <SubTabButton
        $data-active={activeSubTab === '찜한 산책로' ? 'true' : 'false'}
        onClick={() => setActiveSubTab('찜한 산책로')}
      >
        찜한 산책로
      </SubTabButton>
    </SubTabContainer>
  );
}

export default SubTab;
