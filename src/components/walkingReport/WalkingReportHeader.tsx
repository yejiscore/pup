import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import dogWalkingPic from '../../assets/map/dogwalkingpic.png';
import closeIcon from '../../assets/common/close.png';
import { BaseBody2, BaseHead1 } from '../../styles/common/textStyle';

const Img = styled.img`
  margin-left: 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 187px;
  background-color: ${(props) => props.theme.colors.white};
`;

const TopHeader = styled.div`
  width: 100%;
  height: 49px;
`;

const BottomHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 138px;
  width: 100%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: start;
  margin-left: 15px;
  width: 100%;
`;

const Body2 = styled(BaseBody2)`
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 23.87px;
  margin-left: 5px;
`;

const Head1 = styled(BaseHead1)`
  font-weight: 700;
  color: ${(props) => props.theme.colors.primary[5]};
  line-height: 46.8px;
  vertical-align: middle;
  letter-spacing: -1%;
`;

const WalkingReportHeader = () => {
  const navigator = useNavigate();
  // 현재 YYYY . MM . DD 가져오는 함수
  const [today, setToday] = useState('');
  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}. ${month}. ${day}`;
  };

  useEffect(() => {
    setToday(getToday());
  }, []);

  const onClickClose = () => {
    navigator('/walkingReport');
  };
  return (
    <Wrapper>
      <TopHeader onClick={onClickClose}>
        <Img src={closeIcon} alt="close" width={40} height={40} />
      </TopHeader>
      <BottomHeader>
        <Img src={dogWalkingPic} alt="dogWalking" width={78} height={78} />
        <ContentWrapper>
          <Body2>{today}</Body2>
          <Head1>산책 완료!</Head1>
        </ContentWrapper>
      </BottomHeader>
    </Wrapper>
  );
};

export default WalkingReportHeader;
