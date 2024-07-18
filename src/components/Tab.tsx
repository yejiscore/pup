/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';
import WalkList from './WalkList.tsx';

const TabContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  width: 376px;
  height: 49px;
  align-items: center;
  margin-left: 13px;
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
  top: 10px;
  left: 20px;
  padding: 8px 16px 8px 16px;
  gap: 10px;
  border-radius: 100px;
  opacity: 0px;
`;

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

function Tab({ activeTab, setActiveTab }: TabProps) {
  return (
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
  );
}

export default Tab;
