/* eslint-disable indent */
import React from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import { BaseBody1, BaseBody4, BaseHead4 } from '../../styles/common/textStyle';
import heartIcon from '../../assets/common/heart.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import greenLink from '../../assets/common/greenLink.png';
import starIcon from '../../assets/common/star.png';
import isSelectState from '../../stores/selectDataState';
import StartWalkingHeader from '../../components/searchMain/StartWalkingHeader';
import useFetch from '../../hooks/useFetch';
import {
  formatDistance,
  formatRating,
  formatTime,
} from '../../utils/formatTime';

export const Box = styled(BaseBox)`
  background-color: ${(props) => props.theme.colors.white};
`;

export const Body3 = styled(BaseBody4)`
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 600;
  line-height: 26.25px;
  margin-left: 12px;
`;

export const Body1 = styled(BaseBody1)`
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 700;
  line-height: 23.87px;
  margin-left: 12px;
`;

export const Head4 = styled(BaseHead4)`
  color: ${(props) => props.theme.colors.primary[5]};
  font-weight: 400;
  line-height: 26.25px;
  width: 105px;
`;

const HeaderImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const HeaderBox = styled.div`
  width: 376px;
  position: relative;

  .heartIcon {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
  }

  .starWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 10px;
    width: 100%;
  }

  .ratingWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name {
    background-color: ${(props) => props.theme.colors.darkGray};
    border-radius: 100px;
    padding: 6px 16px;
    font-size: 16px;
    font-weight: 400;
    line-height: 18.72px;
    color: ${(props) => props.theme.colors.white};
    margin-left: 20px;
  }

  .rating {
    font-size: 20px;
    font-weight: 400;
    line-height: 23.87px;
    color: ${(props) => props.theme.colors.white};
    margin-left: 12px;
    margin-right: 20px;
  }
`;

export const MiddlewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  /* background-color: ${(props) => props.theme.colors.white}; */
  padding: 0 20px;
`;

export const ComBoxOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-top: 14px;
  padding-bottom: 20px;
  background-color: ${(props) => props.theme.colors.white};

  .contentWrapper {
    margin: 0 20px;
  }

  .contentBox {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 6px;
  }

  .greenLink {
    margin-right: 20px;
  }
`;

export const ComBoxTwo = styled.div`
  display: flex;
  flex-direction: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

const MainBox = styled.div`
  justify-content: start;
  align-items: center;
  width: 100%;
  overflow: hidden;
  margin-left: 20px;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  overflow: hidden;

  .slick-slider {
    height: 100%;
  }

  .slick-list {
    height: 100%;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 5px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
`;

export const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ComBoxThree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${(props) => props.theme.colors.white};

  .comBoxThreeWraperr {
    padding: 0 20px;
    width: 100%;
  }

  .memo {
    margin-top: 12px;
    max-height: 767px;
    min-height: 300px;
    background-color: ${(props) => props.theme.colors.background};
    width: calc(100% - 60px); /* 패딩을 고려한 width 설정 */
    font-size: 18px;
    font-weight: 400;
    line-height: 26.28px;
    padding: 10px;
    border-radius: 18px;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding-bottom: 20px;
`;

export const RegisterButton = styled.button`
  width: 336px;
  height: 64px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  font-size: 24px;
  font-weight: 700;
  line-height: 30.24px;
  cursor: pointer;
`;

export const MemoTextArea = styled.textarea`
  width: 326px;
  max-height: 729px;
  min-height: 200px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 12px;
  margin-right: 20px;
  padding: 5px 10px;
  border: none;
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true, // 이미지 크기에 맞게 슬라이드 너비 조정
};

const SelectTrail = () => {
  const { id } = useParams(); // URL 파라미터에서 id를 가져옴
  const navigate = useNavigate();
  //   const { data: MytrailData } = useFetch('/walking-trail', 'walking-trail', {});

  const { data: trailData } = useFetch(
    `/walking-trail/${id}`,
    `/walking-trail/${id}`,
    {}
  );
  //   // console.log('trailData', trailData);
  //   // console.log('MytrailData', MytrailData);

  const dummyData = {
    code: 200,
    status: 'OK',
    data: {
      walkingTrailId: 9,
      mainImage: null,
      name: '서울시 어쩌구',
      description: '해당 산책에 대한 기록을 저장합니다.',
      walkingTrailUid: 'cf2c63cc-8b06-4b3d-8b2d-30f78be5ada3',
      time: 120,
      distance: 7.5,
      openRange: 'PUBLIC',
      createdDate: '2024-07-21T12:52:17.601437',
      rating: null,
      userId: 6,
      reviewCount: 0,
      likeCount: 1,
      isLike: true,
      imageList: [
        WalkingReportThumbnail,
        WalkingReportThumbnail,
        WalkingReportThumbnail,
        WalkingReportThumbnail,
        WalkingReportThumbnail,
      ],
    },
    message: '산책로를 조회합니다.',
  };

  const handleStart = () => {
    navigate(`/trail/start/${id}`);
  };
  return (
    <Box>
      <StartWalkingHeader data={dummyData.data} />

      <HeaderImgWrapper>
        <HeaderBox>
          {dummyData.data.mainImage !== null &&
          dummyData.data.mainImage !== '' ? (
            <img
              src={dummyData.data.mainImage}
              alt="thumbnail"
              width={376}
              height={281}
            />
          ) : (
            <img
              src={WalkingReportThumbnail}
              alt="thumbnail"
              width={376}
              height={281}
            />
          )}
          {dummyData.data.isLike ? (
            <img
              src={redHeartIcon}
              alt="heart"
              className="heartIcon"
              width={40}
              height={40}
            />
          ) : (
            <img
              src={heartIcon}
              alt="heart"
              className="heartIcon"
              width={40}
              height={40}
            />
          )}
          <div className="starWrapper">
            <span className="name">{dummyData.data.name}의 산책로</span>
            <div className="ratingWrapper">
              <img
                src={starIcon}
                alt="star"
                className="starIcon"
                width={36}
                height={36}
              />
              <span className="rating">
                {formatRating(String(dummyData.data.rating || '0,0'))}
              </span>
            </div>
          </div>
        </HeaderBox>
      </HeaderImgWrapper>

      <MiddlewBox>
        <ComBoxOne>
          <div className="contentWrapper">
            <div className="contentBox">
              <Head4>예상시간</Head4>
              <Body1>{formatTime(dummyData.data.time)}</Body1>
            </div>
            <div className="contentBox">
              <Head4>거리</Head4>
              <Body1>{formatDistance(dummyData.data.distance)}</Body1>
            </div>
          </div>
          <img
            src={greenLink}
            alt="greenLink"
            width={64}
            height={64}
            className="greenLink"
          />
        </ComBoxOne>

        <ComBoxTwo>
          <MainBox>
            <div className="title">
              <Head4>기록</Head4>
            </div>
            <ImageContainer>
              <Slider {...settings}>
                {dummyData.data.imageList.map((photo: any, index: number) => (
                  <ImageWrapper key={v4()}>
                    <ImageBox src={photo} alt={`Walking Photo ${index + 1}`} />
                  </ImageWrapper>
                ))}
              </Slider>
            </ImageContainer>
          </MainBox>
        </ComBoxTwo>

        <ComBoxThree>
          <div className="comBoxThreeWraperr">
            <Head4>메모</Head4>
            <div className="memo">{dummyData.data.description}</div>
          </div>
        </ComBoxThree>
      </MiddlewBox>

      <BottomBox>
        <RegisterButton onClick={handleStart}>이 산책로 선택</RegisterButton>
      </BottomBox>
    </Box>
  );
};

export default SelectTrail;
