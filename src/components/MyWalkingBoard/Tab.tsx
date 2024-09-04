<<<<<<< HEAD
/* eslint-disable no-unused-vars */
// src/components/Tab.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import WalkList from './WalkList';
import SubTab from './SubTab';
import FilterTab from './FilterTab';
import Container from '../common/Container';
import Calendar from '../Calendar/components/Calendar';
import { useAppContext } from '../../context/AppContext';
import MyInfo from '../../pages/MyInfo';
=======
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import SubTab from './SubTab';
import Container from '../common/Container';

import WalkList from './WalkList';
import {
  activeSubTabState,
  activeTabState,
  dateState,
} from '../../stores/myBoardState/myBoardState';
import useFetch from '../../hooks/useFetch';
import { IWalkListType, ResMyBoardType } from '../../types/myBoardTypes';
import Profile from './Profile';
>>>>>>> feature/develop

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 98px;
  overflow-y: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

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

<<<<<<< HEAD
const Button = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#00AE80' : 'transparent')};
  color: ${(props) => (props.active ? '#FFFFFF' : '#00AE80')};
=======
const Button = styled.button<{ $active?: boolean }>`
  background-color: ${(props) => (props.$active ? '#00AE80' : 'transparent')};
  color: ${(props) => (props.$active ? '#FFFFFF' : '#00AE80')};
>>>>>>> feature/develop
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

<<<<<<< HEAD
interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  const [activeSubTab, setActiveSubTab] = useState('내 산책로');
  const { myData, likeData, showCalendar } = useAppContext();
=======
const Wrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Tab() {
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const [activeSubTab, setActiveSubTab] = useRecoilState(activeSubTabState);
  const [date, setDate] = useRecoilState(dateState);
  // const [showCalendar, setShowCalendar] = useState(false);

  const { data: myBoardData, refetch: myBoardDataRefetch } =
    useFetch<ResMyBoardType>(
      '/myboard',
      '/walking-trail',
      {},
      activeSubTab === '내 산책로'
    );

  const { data: likeData, refetch } = useFetch<ResMyBoardType>(
    '/walking-trail/like',
    '/walking-trail/like',
    { type: date },
    activeSubTab === '찜한 산책로'
  );

  useEffect(() => {
    myBoardDataRefetch();
    refetch();
  }, [activeSubTab]);
>>>>>>> feature/develop

  return (
    <>
      <TabContainer>
        <Button
<<<<<<< HEAD
          active={activeTab === '산책로'}
=======
          $active={activeTab === '산책로'}
>>>>>>> feature/develop
          onClick={() => setActiveTab('산책로')}
        >
          산책로
        </Button>
        {/* <Button
<<<<<<< HEAD
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
        </Button> */}
      </TabContainer>
=======
          $active={activeTab === '친구'}
          onClick={() => setActiveTab('친구')}
        >
          친구
        </Button> */}
        <Button
          $active={activeTab === '내정보'}
          onClick={() => setActiveTab('내정보')}
        >
          내정보
        </Button>
      </TabContainer>

>>>>>>> feature/develop
      {activeTab === '산책로' && (
        <>
          <SubTab
            activeSubTab={activeSubTab}
            setActiveSubTab={setActiveSubTab}
          />
<<<<<<< HEAD
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
=======
          {activeSubTab === '내 산책로' && (
            <Container>
              <Wrapper>
                {myBoardData &&
                  myBoardData.data.map((item: IWalkListType) => (
                    <WalkList
                      data={item}
                      key={item.walkingTrailId}
                      activeSubName={activeSubTab}
                    />
                  ))}
              </Wrapper>
            </Container>
          )}
          {activeSubTab === '찜한 산책로' && (
            <Container>
              <Wrapper>
                {likeData &&
                  likeData.data.map((item: IWalkListType) => (
                    <WalkList
                      data={item}
                      key={item.walkingTrailUid}
                      activeSubName={activeSubTab}
                      refetch={refetch}
                    />
                  ))}
              </Wrapper>
>>>>>>> feature/develop
            </Container>
          )}
        </>
      )}
<<<<<<< HEAD
      {/* {activeTab === '친구' && <div>친구 내용</div>}
      {activeTab === '내정보' && (
        <InfoContainer>
          <MyInfo />
        </InfoContainer>
      )} */}
=======
      {/*
      {activeTab === '친구' && (
        <Container>
          <Wrapper>asd</Wrapper>
        </Container>
      )} */}

      {activeTab === '내정보' && (
        <Container>
          <Wrapper>
            <Profile />
          </Wrapper>
        </Container>
      )}
>>>>>>> feature/develop
    </>
  );
}

export default Tab;
