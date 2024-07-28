import React, { useState } from 'react';
import { styled } from 'styled-components';

const MyContainer = styled.div`
  width: 100%;
  height: 168px;
  background-color: yellow;
  overflow-y: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DogContainer = styled.div`
  width: 100%;
  height: 242px;
  background-color: blue;
  overflow-y: auto;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 30px;
  background-color: green;
`;

function MyInfo() {
  return (
    <>
      <MyContainer>
        <div>d</div>
      </MyContainer>
      <DogContainer>
        <div>d</div>
      </DogContainer>
    </>
  );
}

export default MyInfo;
