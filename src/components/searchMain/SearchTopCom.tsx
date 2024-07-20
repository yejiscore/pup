import React, { useState } from 'react';
import Slider from 'react-slick';
import {
  Body1,
  Card,
  DescriptionContent,
  DescriptionTitle,
  HeartIcon,
  ImageContainer,
  Info,
  Rate,
  Text2,
  Text5,
  TitleWrapper,
  TopCom,
} from '../../styles/WalkintSreachStyle/SearchTopCom';
import heartIcon from '../../assets/common/heart.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import startIcon from '../../assets/common/star.png';
import peopleIcon from '../../assets/common/people.png';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import dogWalkingPicIcon from '../../assets/map/dogwalkingpic.png';

const SearchTopCom = () => {
  const dummyData = [
    {
      id: '124',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '00:12:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '00:11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '3544',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34345',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
  };
  const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});

  const handleLikeClick = (id: string) => {
    setLikedCards((prevLikedCards) => ({
      ...prevLikedCards,
      [id]: !prevLikedCards[id],
    }));
  };

  return (
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
              <Text2>{data.title}</Text2>
            </TitleWrapper>
            <Info>
              <DescriptionTitle>산책 시간</DescriptionTitle>
              <DescriptionContent>{data.time}</DescriptionContent>
            </Info>
            <Info>
              <DescriptionTitle>산책 거리</DescriptionTitle>
              <DescriptionContent>{data.distance}</DescriptionContent>
            </Info>

            <Rate>
              <img src={startIcon} alt="star" width={24} height={24} />{' '}
              {data.rate}
              <img src={peopleIcon} alt="people" width={24} height={24} />{' '}
              {data.isWorked ? '0,000' : '0,000'}
            </Rate>
            <HeartIcon
              $isLiked={likedCards[data.id]}
              onClick={() => handleLikeClick(data.id)}
            >
              <img
                src={likedCards[data.id] ? redHeartIcon : heartIcon}
                alt="heart"
              />
            </HeartIcon>
          </Card>
        ))}
      </Slider>
    </TopCom>
  );
};

export default SearchTopCom;
