/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportHeader from '../../components/walkingReport/WalkingReportHeader';
import offStarIcon from '../../assets/common/offStar.png';
import onStarIcon from '../../assets/common/onStar.png';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import {
  MiddlewBox,
  ComBoxOne,
  ComBoxTwo,
  Head4,
  Input,
  Body3,
  TimeDistance,
  RegisterButton,
  ImageContainer,
  ImageWrapper,
  ImageBox,
  MemoTextArea,
  MarginBox,
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
  border-top: 5px solid ${({ theme }) => theme.colors.primary[1]};
  padding-top: 20px;

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

const BottomBox = styled(ComBoxTwo)`
  background-color: ${({ theme }) => theme.colors.white};
  padding-bottom: 40px;
`;

const Star = styled.img`
  width: 63px;
  height: 63px;
  cursor: pointer;
  margin: 0 10px;
  padding-bottom: 16px;
`;

const settings = {
  dots: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  infinite: false,
};

const FinishTrail = () => {
  const { id: trailId } = useParams(); // URL 파라미터에서 id를 가져옴
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const startTrailTime = useRecoilValue(startTrailTimeState);

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
    addReview({
      walkingTrailUid: trailData?.data.walkingTrailUid,
      rating,
      time: startTrailTime,
    });
    navigate('/');
  };

  return (
    <BaseBox>
      <WalkingReportHeader />
      <RatingBox>
        <h1 className="title">오늘 산책은 어떠셨나요?</h1>
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
            {trailData && (
              <Input
                type="text"
                value={trailData.data.name ?? ''}
                disabled
                $isEditing={false}
                maxLength={13}
              />
            )}
          </div>
        </ComBoxOne>

        <ComBoxOne>
          <TimeDistance>
            <Head4>시간</Head4>
            <Body3>{formatTime(startTrailTime)}</Body3>
          </TimeDistance>
          <TimeDistance>
            <Head4>거리</Head4>
            <Body3>
              {trailData ? formatDistance(trailData.data.distance) : '00.00km'}
            </Body3>
          </TimeDistance>
        </ComBoxOne>

        <ComBoxTwo>
          <MarginBox>
            <div className="title">
              <Head4>기록</Head4>
            </div>
            <ImageContainer>
              <Slider {...settings}>
                {trailData &&
                  trailData.data.imageList.map((photo: any, index: number) => (
                    <ImageWrapper key={index}>
                      <ImageBox
                        src={photo}
                        alt={`Walking Photo ${index + 1}`}
                      />
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
              value={(trailData && trailData.data.description) ?? ''}
              disabled
              maxLength={500}
            />
          </MarginBox>
        </ComBoxTwo>
      </MiddlewBox>

      <BottomBox>
        <RegisterButton onClick={handleRegister}>산책 등록하기</RegisterButton>
      </BottomBox>
    </BaseBox>
  );
};

export default FinishTrail;
