/* eslint-disable import/extensions */
// src/components/Detail.tsx
import React from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import Thumbnail from './Thumbnail.tsx';
import TimeDistance from './TimeDistance.tsx';
import Photo from './Photo.tsx';
import Memo from './Memo.tsx';
import { useAppContext } from '../../context/AppContext.tsx';
import StartButton from './StartButton.tsx';
import DetailHeader from './DetailHeader.tsx';

// basebox 복붙 배경색상만 변경
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background-color: white;
  max-width: 100%;
  min-width: 320px;

  @media (max-width: 480px) {
    width: 100%;
    min-width: 320px;
  }
`;

function Detail() {
  const { id } = useParams<{ id: string }>();
  const { myData, likeData } = useAppContext();

  const item =
    myData.find((data) => data.id === Number(id)) ||
    likeData.find((data) => data.id === Number(id));

  if (!item) {
    return <div>Data not found</div>;
  }

  return (
    <Container>
      <DetailHeader />
      <Thumbnail />
      <TimeDistance />
      <Photo />
      {item.memo && <Memo />}
      <StartButton />
    </Container>
  );
}

export default Detail;
