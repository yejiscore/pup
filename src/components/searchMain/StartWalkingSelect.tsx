import React from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import StartWalkingHeader from './StartWalkingHeader';
import { BaseBody1, BaseBody4, BaseHead4 } from '../../styles/common/textStyle';
import heartIcon from '../../assets/common/heart.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import greenLink from '../../assets/common/greenLink.png';
import starIcon from '../../assets/common/star.png';
import isSelectState from '../../stores/selectDataState';

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
  position: relative;

  .heartIcon {
    position: absolute;
    top: 10px;
    right: 40px;
    cursor: pointer;
  }

  .starWrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 10px;
    width: 320px;
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
  }

  .rating {
    font-size: 20px;
    font-weight: 400;
    line-height: 23.87px;
    color: ${(props) => props.theme.colors.white};
    margin-left: 12px;
  }
`;

export const MiddlewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ComBoxOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  margin-top: 14px;
  margin-bottom: 20px;
  .contentBox {
    display: flex;
    justify-content: start;
    align-items: center;
    margin-top: 6px;
  }
  .greenLink {
    margin-right: 40px;
  }
`;

export const ComBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
  margin-top: 14px;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`;

export const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  margin-top: 10px;
  height: 214px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
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
  margin-right: 40px;
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

export const ImageWrapper = styled.div`
  position: relative;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 5px;
`;

export const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
`;

const StartWalkingSelect = () => {
  const dummyData = {
    name: '홍길동',
    time: '00:00:00',
    distance: '0.0km',
    walkingPhotos: [
      WalkingReportThumbnail,
      WalkingReportThumbnail,
      WalkingReportThumbnail,
      WalkingReportThumbnail,
    ],
    memo: '일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십일이삼사오륙칠팔구십',
    rating: 4.5,
  };

  const setIsSelect = useSetRecoilState(isSelectState);
  const handleStart = () => {
    setIsSelect(true);
  };

  return (
    <BaseBox>
      <StartWalkingHeader data={dummyData} />
      <HeaderImgWrapper>
        <img
          src={WalkingReportThumbnail}
          alt="thumbnail"
          width={376}
          height={281}
        />
        <img
          src={heartIcon}
          alt="heart"
          className="heartIcon"
          width={40}
          height={40}
        />
        <div className="starWrapper">
          <span className="name">{dummyData.name}의 산책로</span>
          <div className="ratingWrapper">
            <img
              src={starIcon}
              alt="star"
              className="starIcon"
              width={36}
              height={36}
            />
            <span className="rating">{dummyData.rating}</span>
          </div>
        </div>
      </HeaderImgWrapper>

      <MiddlewBox>
        <ComBoxOne>
          <div>
            <div className="contentBox">
              <Head4>예상시간</Head4>
              <Body1>{dummyData.time}</Body1>
            </div>
            <div className="contentBox">
              <Head4>거리</Head4>
              <Body1>{dummyData.distance}</Body1>
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
          <div className="title">
            <Head4>기록</Head4>
          </div>
          <ImageContainer>
            {dummyData.walkingPhotos.map((photo: any, index: number) => (
              <ImageWrapper key={v4()}>
                <ImageBox src={photo} alt={`Walking Photo ${index + 1}`} />
              </ImageWrapper>
            ))}
          </ImageContainer>
        </ComBoxTwo>

        <ComBoxTwo>
          <div className="title">
            <Head4>메모</Head4>
          </div>

          <MemoTextArea value={dummyData.memo} disabled maxLength={500} />
        </ComBoxTwo>
      </MiddlewBox>

      <BottomBox>
        <ComBoxTwo>
          <RegisterButton onClick={handleStart}>이 산책로 선택</RegisterButton>
        </ComBoxTwo>
      </BottomBox>
    </BaseBox>
  );
};

export default StartWalkingSelect;
