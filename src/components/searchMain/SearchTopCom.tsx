/* eslint-disable react/jsx-curly-newline */
import React, { useState } from 'react';
import Slider from 'react-slick';
import { useSetRecoilState } from 'recoil';
import { Body1, TopCom } from '../../styles/WalkintSreachStyle/SearchTopCom';

import useFetch from '../../hooks/useFetch';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import useMutate from '../../hooks/useMutate';
import VerticalCard from '../common/VerticalCard';
import selectTrailState from '../../stores/selectTrail';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
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

const SearchTopCom = () => {
  const name = '';
  const type = 'RECENT';
  const { data: trailData } = useFetch<ResIUserTrailLists>(
    `[trailData/search/${name}${type}]`,
    '/walking-trail/search',
    {
      name,
      type,
    }
  );
  // console.log('trailData', trailData);
  // const { data: userData } = useFetch('user', '/walking-trail', {});
  // console.log('userData', userData);

  return (
    <TopCom>
      <Body1>인기 산책로</Body1>
      <Slider {...settings}>
        {trailData &&
          trailData.data.map((data) => (
            <div key={data.walkingTrailId}>
              <VerticalCard data={data} />
            </div>
          ))}
      </Slider>
    </TopCom>
  );
};

export default SearchTopCom;
