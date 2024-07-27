import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { BaseBody1, BaseText3 } from '../../styles/common/textStyle';
import { Text2 } from '../../styles/WalkintSreachStyle/SearchTopCom';
import useFetch from '../../hooks/useFetch';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import HorizontalCard from '../common/HorizontalCard';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding-bottom: 25px;
`;

const Box = styled(Wrapper)`
  /* padding: 0 20px; */
  display: flex;
  flex-direction: column;
`;

const Title = styled(BaseBody1)`
  font-weight: 700;
  line-height: 23.87px;
  margin-left: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  .slick-slider {
    margin-left: 20px;
    margin-top: 12px;
  }

  .slick-slide {
    width: 336px;
    margin: 0 20px;
  }
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true, // 슬라이드 너비를 자동으로 조절
};

const dummyData = {
  code: 200,
  data: [
    {
      walkingTrailId: 11,
      mainImage: null,
      name: '서울시 어쩌구',
      description: '해당 산책에 대한 기록을 저장합니다.',
      walkingTrailUid: 'cf2c63cc-8b06-4b3d-8b2d-30f78be5ada1',
      time: 120,
      distance: 0,
      openRange: 'PUBLIC',
      createdDate: '2024-07-21T12:54:17.601',
      rating: 2,
      userId: 6,
      userUid: 'b758c502-049e-42ab-ac19-95b9f7524e59',
      reviewCount: 2,
      likeCount: 0,
      isLike: false,
      itemList: [],
    },
    {
      walkingTrailId: 10,
      mainImage: null,
      name: '서울시 어쩌구',
      description: '해당 산책에 대한 기록을 저장합니다.',
      walkingTrailUid: 'cf2c63cc-8b06-4b3d-8b2d-30f78be5ada2',
      time: 120,
      distance: 0,
      openRange: 'PUBLIC',
      createdDate: '2024-07-21T12:53:17.601',
      rating: 2.75,
      userId: 6,
      userUid: 'b758c502-049e-42ab-ac19-95b9f7524e59',
      reviewCount: 4,
      likeCount: 0,
      isLike: false,
      itemList: [],
    },
    {
      walkingTrailId: 9,
      mainImage: null,
      name: '서울시 어쩌구',
      description: '해당 산책에 대한 기록을 저장합니다.',
      walkingTrailUid: 'cf2c63cc-8b06-4b3d-8b2d-30f78be5ada3',
      time: 120,
      distance: 0,
      openRange: 'PUBLIC',
      createdDate: '2024-07-21T12:52:17.601437',
      rating: null,
      userId: 6,
      userUid: 'b758c502-049e-42ab-ac19-95b9f7524e59',
      reviewCount: 0,
      likeCount: 1,
      isLike: true,
      itemList: [
        {
          walkingTrailItemId: 24,
          lat: 37.467048,
          lng: 126.707938,
        },
        {
          walkingTrailItemId: 25,
          lat: 12.121231,
          lng: 12.121231,
        },
      ],
    },
  ],
};

const SearchBottomCom = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('RECENT');
  const { data: trailData } = useFetch<ResIUserTrailLists>(
    `[trailData/search/${name}${type}]`,
    '/walking-trail/search',
    {
      name,
      type,
    }
  );
  console.log('trailData', trailData);
  return (
    <Wrapper>
      <Box>
        <Title>방금 산책했어요!</Title>
        <CardWrapper>
          <Slider {...settings}>
            {trailData &&
              trailData.data.map((data) => (
                <div key={data.walkingTrailUid}>
                  <HorizontalCard data={data} />
                </div>
              ))}
          </Slider>
        </CardWrapper>
      </Box>
    </Wrapper>
  );
};

export default SearchBottomCom;
