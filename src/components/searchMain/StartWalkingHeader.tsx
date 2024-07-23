import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import MeatballsIcon from '../../assets/common/ball.png';
import BackIcon from '../../assets/common/back.png';

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 49px;
  position: relative;
  background-color: ${(props) => props.theme.colors.white};
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
  /* position: absolute; */
  /* top: -7px; */
  /* right: 10px; */
  cursor: pointer;
`;

const StartWalkingHeader = ({ data }: any) => {
  const navigate = useNavigate();
  const handleBackIconClick = () => {
    // 뒤로 돌아가기
    navigate(-1);
  };
  return (
    <Container>
      <IconButton src={BackIcon} alt="backIcon" onClick={handleBackIconClick} />
      <Title>{data.name}</Title>
      <div />
      {/* <IconButton src={MeatballsIcon} alt="moreIcon" /> */}
    </Container>
  );
};

export default StartWalkingHeader;
