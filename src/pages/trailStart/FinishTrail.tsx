/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportHeader from '../../components/walkingReport/WalkingReportHeader';
import offStarIcon from '../../assets/common/offStar.png';
import onStarIcon from '../../assets/common/onStar.png';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import {
  MiddlewBox,
  ComBoxOne,
  ComBoxTwo,
  BtnImage,
  Head4,
  Input,
  Body3,
  TimeDistance,
  BottomBox,
  ButtonWrapper,
  ToggleButtonGroup,
  ToggleButton,
  RegisterButton,
  CharCount,
  ImageContainer,
  ImageWrapper,
  ImageBox,
  DeleteButton,
  ButtonMemo,
  MemoTextArea,
  Text,
  MarginBox,
  ButtonTitleHead4,
} from '../../styles/walkingReportStyle/WalkingReportStyle';
import { formatDistance, formatTime } from '../../utils/formatTime';
import startTrailTimeState from '../../stores/startTrailTime';
import useMutate from '../../hooks/useMutate';
import useFetch from '../../hooks/useFetch';
import { IGetUserTrailType } from '../../types/getUserTrailType';

const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 130px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  .title {
    font-size: 24px;
    font-weight: 700;
    line-height: 30.24px;
    text-align: center;
    margin-bottom: 18px;
  }

  .starWapper {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Star = styled.img`
  width: 63px;
  height: 63px;
  cursor: pointer;
  margin: 0 10px;
  padding-bottom: 16px;
`;

const dummyData = {
  code: 200,
  status: 'OK',
  data: {
    walkingTrailId: 4,
    mainImage: null,
    name: '즐거운 산책로',
    description: '재밌는 산책로',
    walkingTrailUid: '93e1ce84-4e96-468b-b21e-7622f9cc0e42',
    time: 0,
    distance: 20,
    openRange: null,
    createdDate: '2024-07-18T00:40:02.808216',
    rating: 2,
    userId: 4,
    reviewCount: 2,
    likeCount: 0,
    isLike: false,
    itemList: [
      {
        walkingTrailItemId: 3,
        lat: 37.5665,
        lng: 126.978,
      },
      {
        walkingTrailItemId: 4,
        lat: 37.5675,
        lng: 126.979,
      },
      {
        walkingTrailItemId: 5,
        lat: 37.5685,
        lng: 126.98,
      },
      {
        walkingTrailItemId: 6,
        lat: 37.5695,
        lng: 126.981,
      },
      {
        walkingTrailItemId: 7,
        lat: 37.5705,
        lng: 126.982,
      },
      {
        walkingTrailItemId: 8,
        lat: 37.5715,
        lng: 126.983,
      },
      {
        walkingTrailItemId: 9,
        lat: 37.5725,
        lng: 126.984,
      },
    ],
    imageList: [WalkingReportThumbnail],
  },
  message: '산책로를 조회합니다.',
};

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: dummyData.data.imageList.length,
  slidesToScroll: 1,
  infinite: false,
};

const FinishTrail = () => {
  const { id: trailId } = useParams(); // URL 파라미터에서 id를 가져옴

  const [rating, setRating] = useState(0);
  const startTrailTime = useRecoilValue(startTrailTimeState);
  console.log(startTrailTime);
  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  const { mutate: addReview } = useMutate(
    'addReview',
    '/walking-trail/review',
    'post'
  );
  const { data: trailData } = useFetch<IGetUserTrailType>(
    `/walking-trail/${trailId}`,
    `/walking-trail/${trailId}`,
    {}
  );

  const handleRegister = () => {
    console.log('산책 등록하기');
    console.log(rating);
    console.log(startTrailTime);
    addReview({
      walkingTrailUid: trailData?.data.walkingTrailUid,
      rating,
      time: startTrailTime,
    });
  };

  return (
    <BaseBox>
      <WalkingReportHeader />
      <RatingBox>
        <h1 className="title">산책로 평가가 완료되었습니다.</h1>
        <div className="starWapper">
          {[0, 1, 2, 3, 4].map((index) => (
            <Star
              key={index}
              src={index < rating ? onStarIcon : offStarIcon}
              alt={`star-${index + 1}`}
              onClick={() => handleStarClick(index)}
            />
          ))}
        </div>
      </RatingBox>
      <img
        src={WalkingReportThumbnail}
        alt="thumbnail"
        width={376}
        height={281}
      />
      <MiddlewBox>
        <ComBoxOne>
          <div className="firstBox">
            <Head4>이름</Head4>
            <Input
              type="text"
              value={dummyData.data.name ?? ''}
              disabled
              $isEditing={false}
              maxLength={13}
            />
          </div>
        </ComBoxOne>

        <ComBoxOne>
          <TimeDistance>
            <Head4>시간</Head4>
            <Body3>{formatTime(startTrailTime)}</Body3>
          </TimeDistance>
          <TimeDistance>
            <Head4>거리</Head4>
            <Body3>{formatDistance(dummyData.data.distance)}</Body3>
          </TimeDistance>
        </ComBoxOne>

        <ComBoxTwo>
          <MarginBox>
            <div className="title">
              <Head4>기록</Head4>
            </div>
            <ImageContainer>
              <Slider {...settings}>
                {dummyData.data.imageList.map((photo: any, index: number) => (
                  <ImageWrapper key={index}>
                    <ImageBox src={photo} alt={`Walking Photo ${index + 1}`} />
                  </ImageWrapper>
                ))}
              </Slider>
            </ImageContainer>
          </MarginBox>
        </ComBoxTwo>

        <ComBoxTwo style={{ marginTop: '20px' }}>
          <MarginBox>
            <div className="title">
              <Head4>메모</Head4>
            </div>

            <MemoTextArea
              placeholder="메모를 작성해주세요"
              value={dummyData.data.description ?? ''}
              disabled
              maxLength={500}
            />
          </MarginBox>
        </ComBoxTwo>
      </MiddlewBox>

      <ComBoxTwo>
        <RegisterButton onClick={handleRegister}>산책 등록하기</RegisterButton>
      </ComBoxTwo>
    </BaseBox>
  );
};

export default FinishTrail;
