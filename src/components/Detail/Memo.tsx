import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext.tsx';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 30px 30px 30px;
  box-sizing: border-box;
  gap: 10px;
`;

const MemoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: #edf9f6;
  border-radius: 18px;
  font-weight: 400;
  line-height: 26.28px;
`;

const MemoText = styled.div`
  font-size: 18px;
  color: #283330;
  padding: 20px;
`;

const MemoTitle = styled.div`
  font-size: 22px;
  color: #00ae80;
  margin: 20px 0 0px;
`;

function Memo() {
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
      <MemoTitle>메모</MemoTitle>
      <MemoContainer>
        <MemoText>{item.memo}</MemoText>
      </MemoContainer>
    </Container>
  );
}

export default Memo;
