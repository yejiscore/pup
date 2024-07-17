/* eslint-disable import/extensions */
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header.tsx';
import Tab from './Tab.tsx';
import WalkList from './WalkList.tsx';
import { myData } from '../data/mydata.js';
import { likeData } from '../data/likedata.js';
import SubTab from './SubTab.tsx';

const InnerContainer = styled.div`
  width: 376px;
  height: 812px;
  background-color: #EDF9F6;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentArea = styled.div`
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: 49px;
`;

function MyBoardPage() {
  const [activeTab, setActiveTab] = useState('산책로');
  const [activeSubTab, setActiveSubTab] = useState('내 산책로');

  return (
    <InnerContainer>
      <Header />
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
      <ContentArea>
        {activeTab === '산책로' && (
          <>
            <SubTab activeSubTab={activeSubTab} setActiveSubTab={setActiveSubTab} />
            {activeSubTab === '내 산책로' && <WalkList data={myData} />}
            {activeSubTab === '찜한 산책로' && <WalkList data={likeData} />}
          </>
        )}
        {activeTab === '친구' && <div>친구 내용</div>}
        {activeTab === '내정보' && <div>내정보 내용</div>}
      </ContentArea>
    </InnerContainer>
  );
}

export default MyBoardPage;