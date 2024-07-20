/* eslint-disable import/no-unresolved */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';
import MeatballsIcon from '../../assets/common/ball.png';
// import TrashIcon from '../images/Property 1=trash off.png';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 49px;
  position: relative;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bold;
  width: 256px;
  height: 17.41px;
  position: absolute;
  top: 15.79px;
  left: 60px;
  text-align: center;
  opacity: 1;
`;

const IconButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 5px;
  left: 316px;
  padding: 0px 6.66px;
  gap: 0px;
  opacity: 1;
  cursor: pointer;
`;

function SearchHeader() {
  const [isTrashIcon, setIsTrashIcon] = useState(false);

  const handleIconClick = () => {
    setIsTrashIcon(!isTrashIcon);
  };

  return (
    <Container>
      <Title>산책로 찾기</Title>
      <div>
        <IconButton src={MeatballsIcon} onClick={handleIconClick} />
      </div>
    </Container>
  );
}

export default SearchHeader;
