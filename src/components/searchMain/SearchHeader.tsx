import React, { useState } from 'react';
import styled from 'styled-components';
import MeatballsIcon from '../../assets/common/ball.png';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 49px;
  position: relative;
  margin: 15.79px 0;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
`;

const IconButton = styled.img`
  width: 40px;
  height: 40px;
  position: absolute;
  /* top: -7px; */
  right: 10px;
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
      {/* <IconButton src={MeatballsIcon} onClick={handleIconClick} /> */}
    </Container>
  );
}

export default SearchHeader;
