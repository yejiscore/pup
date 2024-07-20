import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import BaseLayout from '../../layouts/Layout';
import SearchHeader from '../../components/searchMain/SearchHeader';
import searchIcon from '../../assets/common/search.png';
import mapIcon from '../../assets/common/map.png';
import heartIcon from '../../assets/common/heart.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import startIcon from '../../assets/common/star.png';
import peopleIcon from '../../assets/common/people.png';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import dogWalkingPicIcon from '../../assets/map/dogwalkingpic.png';

import { BaseBody1, BaseText5 } from '../../styles/common/textStyle';

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: #edf9f6; */
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  justify-content: center;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1000px;
  height: 38px;
  width: 299px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${(props) => props.theme.colors.offGray};
  &::placeholder {
    color: #b7cac4;
  }
  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  width: 36px;
  height: 36px;
  /* margin: 0 10px; */
`;

const TopCom = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  /* align-items: center; */
  width: 100%;
  height: 49px;
  position: relative;
`;

const Body1 = styled(BaseBody1)`
  font-weight: 700;
  line-height: 23.87px;
  margin-left: 20px;
  margin-top: 20px;
  text-align: left;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  width: 154px;
  height: 263px;
  position: relative;
`;

const Text5 = styled(BaseText5)`
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 10px;
  margin-top: 10px;
`;

const ImageContainer = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: red;
`;

const Description = styled.div`
  font-size: 16px;
  color: #707070;
  /* margin-bottom: 10px; */
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 10px; */
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #707070;
`;

const HeartIcon = styled.div<{ $isLiked: boolean }>`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  color: ${(props) =>
    props.$isLiked ? props.theme.colors.white : props.theme.colors.primary[5]};
`;

const SearchMain = () => {
  const dummyData = [
    {
      id: '124',
      name: 'asd',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34',
      name: 'asd',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    // {
    //   id: '34',
    //   name: 'asd',
    //   img: 'asd',
    //   desc: '일이삼사오륙칠팔구십일이삼',
    //   time: '11:00',
    //   distance: '1.2km',
    //   rate: 4.5,
    //   isWorked: 0.005,
    // },
    // {
    //   id: '34',
    //   name: 'asd',
    //   img: 'asd',
    //   desc: '일이삼사오륙칠팔구십일이삼',
    //   time: '11:00',
    //   distance: '1.2km',
    //   rate: 4.5,
    //   isWorked: 0.005,
    // },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const [isLiked, setIsLiked] = useState(false);

  return (
    <BaseLayout>
      <SearchHeader />
      <SearchBarContainer>
        <InputContainer>
          <Icon src={searchIcon} alt="search" />
          <SearchInput placeholder="원하는 산책로의 이름 또는 현재 지역을 검색해 보세요" />
        </InputContainer>
        <Icon src={mapIcon} alt="map" />
      </SearchBarContainer>
      <TopCom>
        <Body1>내 주변 인기 산책로</Body1>
        <Slider {...settings}>
          {dummyData.map((data) => (
            <Card key={data.id}>
              <Text5>닉네임의 산책길</Text5>
              <ImageContainer>
                <img
                  src={walkingReportThumbnail}
                  alt="dog"
                  width={130}
                  height={87}
                  style={{ borderRadius: '12px' }}
                />
              </ImageContainer>

              <TitleWrapper>
                <img
                  src={dogWalkingPicIcon}
                  alt="dogWalkingPic"
                  width={26}
                  height={26}
                />
              </TitleWrapper>

              {isLiked ? (
                <HeartIcon
                  $isLiked={isLiked}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <img src={redHeartIcon} alt="redHeart" />
                </HeartIcon>
              ) : (
                <HeartIcon
                  $isLiked={isLiked}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <img src={heartIcon} alt="heart" />
                </HeartIcon>
              )}
              {/* <Description>{data.name}</Description>
              <Description>{data.desc}</Description>
              <Info>
                <Description>산책 시간</Description>
                <Description>{data.time}</Description>
              </Info>
              <Info>
                <Description>산책 거리</Description>
                <Description>{data.distance}</Description>
              </Info>
              <Rate>
                <img src={startIcon} alt="star" width={24} height={24} />{' '}
                {data.rate}
                <img
                  src={peopleIcon}
                  alt="people"
                  width={24}
                  height={24}
                />{' '}
                {data.isWorked ? '0,000' : '0,000'}
              </Rate> */}
            </Card>
          ))}
        </Slider>
      </TopCom>
    </BaseLayout>
  );
};

export default SearchMain;
