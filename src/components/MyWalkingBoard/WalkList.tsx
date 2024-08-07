/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { IWalkListType, ResMyBoardType } from '../../types/myBoardTypes';
import holThumbnail from '../../assets/common/holThumbnail.png';
import {
  formatDate,
  formatDistance,
  formatRating,
  formatTime,
} from '../../utils/formatTime';
import startIcon from '../../assets/common/star.png';
import { BaseText2, BaseText3 } from '../../styles/common/textStyle';
import linkIcon from '../../assets/common/link.png';
import linkShareState from '../../stores/linkShare';
import {
  deleteIdListState,
  isTrashIconState,
} from '../../stores/myBoardState/myBoardState';
import checkCardIcon from '../../assets/checkCard.png';
import noCheckCardIcon from '../../assets/noCheckCard.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import { HeartIcon } from '../../styles/WalkintSreachStyle/SearchTopCom';
import useMutate from '../../hooks/useMutate';

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 16px;
  width: 336px;
  height: 116px;
  position: relative;
  display: flex !important;
  align-items: center;
  margin: 10px 0;
  padding-left: 14px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 203px;
  height: 36px;
  margin-top: 14px;

  .name {
    font-weight: 400;
    font-size: 14px;
    line-height: 14px;
    line-height: 16.71px;
    margin-bottom: 5px;
  }

  .content {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    line-height: 22px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  width: 203px;
  height: 17px;
`;

export const Info = styled.div`
  display: flex;
  margin-top: 4.5px;
`;

export const DescriptionTitle = styled(BaseText2)`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  color: ${(props) => props.theme.colors.primary[5]};
  margin-right: 10px;
  margin-left: 0;
`;

export const DescriptionContent = styled(BaseText3)`
  font-size: 14px;
  font-weight: 600;
  line-height: 16.38px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const NameRatingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 20px;

  .name {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.32px;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

const Rate = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 47px;
  height: 18px;

  font-size: 16px;
  font-weight: 400;
  line-height: 18.72px;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 10px;

  .rating {
    font-size: 16px;
    font-weight: 400;
    line-height: 18.72px;
    margin-left: 3px;
  }
`;

const Visibility = styled.div<{ $visibility: string }>`
  width: 56px;
  height: 16px;
  padding: 4px 7px;
  gap: 10px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${({ $visibility }) =>
    $visibility === 'PROTECTED'
      ? '#9F64FF'
      : $visibility === 'PUBLIC'
        ? '#00AE80'
        : '#283330'};
  color: white;
  text-align: center;
  font-size: 12px;
  opacity: ${({ $visibility }) => ($visibility ? '1' : '0')};
`;

const LinkImg = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
  width: 40px;
  height: 40px;
`;

const GoPageImg = styled.img`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 31px;
  height: 31px;
`;

const CircleImage = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 17px;
`;

interface IWalkListProps {
  data: IWalkListType;
  activeSubName: string;
  refetch?: () => void;
}

const WalkList = ({ data, activeSubName, refetch }: IWalkListProps) => {
  const [mainImage, setMainImage] = useState(data.mainImage ?? '');
  const setLinkShare = useSetRecoilState(linkShareState);
  const isTrashIcon = useRecoilValue(isTrashIconState);
  const [isSelected, setIsSelected] = useState(false);
  const setDeleteIdList = useSetRecoilState<number[]>(deleteIdListState);
  const navigate = useNavigate();

  const handleCircleClick = () => {
    setIsSelected(!isSelected);
    if (isSelected) {
      setDeleteIdList((prev: number[]) =>
        prev.filter((id: number) => id !== data.walkingTrailId)
      );
    } else {
      setDeleteIdList((prev: number[]) => [...prev, data.walkingTrailId]);
    }
  };

  const handeleError = () => {
    setMainImage(holThumbnail);
  };

  const handleShowPopup = (url: string) => {
    setLinkShare({ isLinkShare: true, shareUrl: url });
  };

  const goPage = () => {
    navigate(`/trail/select/${data.walkingTrailUid}`);
  };

  return (
    <Card key={data.walkingTrailUid}>
      <img
        src={mainImage}
        alt="thumbnail"
        width={69}
        height={88}
        onError={handeleError}
        style={{ borderRadius: '12px' }}
      />
      <ContentWrapper onClick={goPage}>
        <TopWrapper>
          <span className="name">{formatDate(data.createdDate)}</span>
          <span className="content">{data.name}</span>
        </TopWrapper>
        <InfoWrapper>
          <Info>
            <DescriptionTitle>시간</DescriptionTitle>
            <DescriptionContent>{formatTime(data.time)}</DescriptionContent>
          </Info>
          <Info>
            <DescriptionTitle>거리</DescriptionTitle>
            <DescriptionContent>
              {formatDistance(data.distance)}
            </DescriptionContent>
          </Info>
        </InfoWrapper>
        <NameRatingWrapper>
          <Visibility $visibility={data.openRange}>
            {data.openRange === 'PROTECTED'
              ? '친구만'
              : data.openRange === 'PUBLIC'
                ? '공개'
                : '비공개'}
          </Visibility>
          <span className="name">{data.userUid}의 산책길</span>
          <Rate>
            <img src={startIcon} alt="star" width={24} height={24} />
            <span className="rating">
              {data.rating ? formatRating(String(data.rating)) : '0,0'}
            </span>
          </Rate>
        </NameRatingWrapper>
      </ContentWrapper>
      {activeSubName === '내 산책로' ? (
        <div>
          {isTrashIcon ? (
            <CircleImage
              src={isSelected ? checkCardIcon : noCheckCardIcon}
              onClick={handleCircleClick}
            />
          ) : (
            <LinkImg
              src={linkIcon}
              onClick={() =>
                handleShowPopup(
                  `https://www.domountainbe.shop/trail/select/${data.walkingTrailUid}`
                )
              }
            />
          )}
        </div>
      ) : (
        <HeartIcon
          $isLiked={data.isLike}
          // onClick={() => handleLikeClick(data.walkingTrailUid, data.isLike)}
        >
          <img src={redHeartIcon} alt="heart" />
        </HeartIcon>
      )}
    </Card>
  );
};

export default WalkList;
