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

  return (
    <Wrapper>
      <Box>
        <Title>방금 산책했어요!</Title>
        <CardWrapper>
          <Slider {...settings}>
            {trailData &&
              trailData.data.map((data) => <HorizontalCard data={data} />)}
          </Slider>
        </CardWrapper>
      </Box>
    </Wrapper>
  );
};

export default SearchBottomCom;
