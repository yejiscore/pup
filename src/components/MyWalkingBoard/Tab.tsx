/* eslint-disable no-unused-vars */
// src/components/Tab.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WalkList from './WalkList.tsx';
import { useAppContext } from '../../context/AppContext.tsx';
import SubTab from './SubTab.tsx';
import FilterTab from './FilterTab.tsx';
import Container from '../common/Container.tsx';
import Calendar from '../Calendar/components/Calendar.tsx';

const TabContainer = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-left: 20px;
  box-sizing: border-box;
  position: absolute;
  top: 49px;
`;

const Button = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#00AE80' : 'transparent')};
  color: ${(props) => (props.active ? '#FFFFFF' : '#00AE80')};
  border: 1px solid #00ae80;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 79px;
  height: 29px;
  padding: 8px 16px;
  gap: 10px;
  border-radius: 100px;
`;

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  const [activeSubTab, setActiveSubTab] = useState('내 산책로');
  const { myData, likeData, showCalendar } = useAppContext();

  return (
    <>
      <TabContainer>
        <Button
          active={activeTab === '산책로'}
          onClick={() => setActiveTab('산책로')}
        >
          산책로
        </Button>
        <Button
          active={activeTab === '친구'}
          onClick={() => setActiveTab('친구')}
        >
          친구
        </Button>
        <Button
          active={activeTab === '내정보'}
          onClick={() => setActiveTab('내정보')}
        >
          내정보
        </Button>
      </TabContainer>
      {activeTab === '산책로' && (
        <>
          <SubTab
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
          <FilterTab activeSubTab={activeSubTab} />
          {activeSubTab === '내 산책로' &&
            (showCalendar ? (
              <Calendar />
            ) : (
              <Container>
                <WalkList data={myData} activeSubTab={activeSubTab} />
              </Container>
            ))}
          {activeSubTab === '찜한 산책로' && (
            <Container>
              <WalkList data={likeData} activeSubTab={activeSubTab} />
            </Container>
          )}
        </>
      )}
      {activeTab === '친구' && <div>친구 내용</div>}
      {activeTab === '내정보' && <div>내정보 내용</div>}
    </>
  );
}

export default Tab;
