/* eslint-disable no-param-reassign */
/* eslint-disable indent */
import React, { SyntheticEvent, useEffect, useState } from 'react';
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
import { IGetUserTrailType } from '../../types/getUserTrailType';
import useMutate from '../../hooks/useMutate';
import linkShareState from '../../stores/linkShare';

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

const HeartIcon = styled.img`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
`;

const LinkIcon = styled.img`
  margin-right: 20px;

  cursor: pointer;
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
  const setLinkShare = useSetRecoilState(linkShareState);

  const handleShowPopup = (url: string) => {
    setLinkShare({ isLinkShare: true, shareUrl: url });
  };

  const { data: trailData } = useFetch<IGetUserTrailType>(
    `/walking-trail/${id}`,
    `/walking-trail/${id}`,
    {}
  );
  console.log('trailData', trailData);
  const [mainImage, setMainImage] = useState<string>('');
  const [isUserLiked, setIsUserLiked] = useState(false);
  useEffect(() => {
    if (trailData) {
      setIsUserLiked(trailData.data.isLike);
      setMainImage(trailData.data.mainImage || WalkingReportThumbnail);
    }
  }, [trailData]);

  const handleStart = () => {
    navigate(`/trail/start/${id}`);
  };

  const onErrorHandler = () => {
    setMainImage(WalkingReportThumbnail);
  };

  const handleImageError = (event: any) => {
    event.target.src = WalkingReportThumbnail;
  };

  const { mutate: likeAction } = useMutate(
    'walking-trail/like',
    `/walking-trail/like/${id}`,
    'patch'
  );

  const handleLikeClick = () => {
    likeAction(
      { like: !isUserLiked },
      {
        onSuccess: () => {
          setIsUserLiked(!isUserLiked);
        },
      }
    );
  };

  return (
    <Box>
      {trailData && (
        <>
          <StartWalkingHeader data={trailData.data} />

          <HeaderImgWrapper>
            <HeaderBox>
              <img
                src={mainImage}
                alt="thumbnail"
                width={376}
                height={281}
                onError={onErrorHandler}
              />

              {isUserLiked ? (
                <HeartIcon
                  src={redHeartIcon}
                  alt="heart"
                  className="heartIcon"
                  width={40}
                  height={40}
                  onClick={handleLikeClick}
                />
              ) : (
                <HeartIcon
                  src={heartIcon}
                  alt="heart"
                  className="heartIcon"
                  width={40}
                  height={40}
                  onClick={handleLikeClick}
                />
              )}
              <div className="starWrapper">
                <span className="name">{trailData.data.name}의 산책로</span>
                <div className="ratingWrapper">
                  <img
                    src={starIcon}
                    alt="star"
                    className="starIcon"
                    width={36}
                    height={36}
                  />
                  <span className="rating">
                    {formatRating(String(trailData.data.rating || '0,0'))}
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
                  <Body1>{trailData && formatTime(trailData.data.time)}</Body1>
                </div>
                <div className="contentBox">
                  <Head4>거리</Head4>
                  <Body1>
                    {trailData && formatDistance(trailData.data.distance)}
                  </Body1>
                </div>
              </div>
              <LinkIcon
                src={greenLink}
                alt="greenLink"
                width={64}
                height={64}
                onClick={() =>
                  handleShowPopup(
                    `https://www.domountainbe.shop/trail/select/${id}`
                  )
                }
              />
            </ComBoxOne>

            <ComBoxTwo>
              <MainBox>
                <div className="title">
                  <Head4>기록</Head4>
                </div>
                <ImageContainer>
                  <Slider {...settings}>
                    {trailData.data.imageList.map(
                      (photo: any, index: number) => (
                        <ImageWrapper key={v4()}>
                          <ImageBox
                            src={photo}
                            alt={`Walking Photo ${index + 1}`}
                            onError={handleImageError}
                          />
                        </ImageWrapper>
                      )
                    )}
                  </Slider>
                </ImageContainer>
              </MainBox>
            </ComBoxTwo>

            <ComBoxThree>
              <div className="comBoxThreeWraperr">
                <Head4>메모</Head4>
                <div className="memo">{trailData.data.description}</div>
              </div>
            </ComBoxThree>
          </MiddlewBox>
          <BottomBox>
            <RegisterButton onClick={handleStart}>
              이 산책로 선택
            </RegisterButton>
          </BottomBox>
        </>
      )}
    </Box>
  );
};

export default SelectTrail;
