/* eslint-disable import/extensions */
import React from 'react';
import { styled } from 'styled-components';
import { useParams } from 'react-router-dom';
import Thumbnail from './Thumbnail';
import TimeDistance from './TimeDistance';
import Photo from './Photo';
import Memo from './Memo';
import { useAppContext } from '../../context/AppContext';
import StartButton from './StartButton';
import DetailHeader from './DetailHeader';
import { DataItem } from '../../types/DataItem';

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

  const item: DataItem | undefined =
    myData.find((data) => data.walkingTrailId === Number(id)) ||
    likeData.find((data) => data.walkingTrailId === Number(id));

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
