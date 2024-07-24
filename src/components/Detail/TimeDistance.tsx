// src/components/Detail/DetailInfo.tsx
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.tsx';

const Container = styled.div`
  width: 100%;
  height: 69px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Time = styled.div`
  font-size: 22px;
  color: #00ae80;
  text-align: left;
  span {
    color: #283330;
    font-weight: bold;
    margin-left: 7px;
  }
`;

const Distance = styled.div`
  font-size: 22px;
  color: #00ae80;
  text-align: right;
  span {
    color: #283330;
    font-weight: bold;
    margin-left: 7px;
  }
`;

function TimeDistance() {
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
      <Wrapper>
        <Time>
          시간 <span>{item.time}</span>
        </Time>
        <Distance>
          거리 <span>{item.distance}</span>
        </Distance>
      </Wrapper>
    </Container>
  );
}

export default TimeDistance;
