/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import Slider from 'react-slick';
import { Body1, TopCom } from '../../styles/WalkintSreachStyle/SearchTopCom';

import useFetch from '../../hooks/useFetch';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import VerticalCard from '../common/VerticalCard';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
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
