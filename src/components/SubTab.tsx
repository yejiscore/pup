/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components';

const SubTabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  // width: 100%;
  background-color: #ffffff;
`;

const SubTabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? '#00AE80' : '#B7CAC4')};
  border: none;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  font-size: 1em;
  weight: 10px;
  height: 49px;
  color: ${(props) => (props.active ? '#fff' : '#000')};
`;

interface SubTabProps {
  activeSubTab: string;
  setActiveSubTab: (tab: string) => void;
}

function SubTab({ activeSubTab, setActiveSubTab }: SubTabProps) {
  return (
    <SubTabContainer>
      <SubTabButton
        active={activeSubTab === '내 산책로'}
        onClick={() => setActiveSubTab('내 산책로')}
      >
        내 산책로
      </SubTabButton>
      <SubTabButton
        active={activeSubTab === '찜한 산책로'}
        onClick={() => setActiveSubTab('찜한 산책로')}
      >
        찜한 산책로
      </SubTabButton>
    </SubTabContainer>
  );
}

export default SubTab;
