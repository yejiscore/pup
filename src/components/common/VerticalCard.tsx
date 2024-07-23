import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  Card,
  DescriptionContent,
  DescriptionTitle,
  HeartIcon,
  ImageContainer,
  Info,
  Rate,
  Text2,
  Text5,
  TitleWrapper,
} from '../../styles/WalkintSreachStyle/SearchTopCom';

import heartIcon from '../../assets/common/heart.png';
import redHeartIcon from '../../assets/common/redHeart.png';
import startIcon from '../../assets/common/star.png';
import peopleIcon from '../../assets/common/people.png';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import dogWalkingPicIcon from '../../assets/map/dogwalkingpic.png';
import { IUserTrailLists } from '../../types/getUserTrailListsType';
import useMutate from '../../hooks/useMutate';
import {
  formatDistance,
  formatRating,
  formatReviewCount,
  formatTime,
} from '../../utils/formatTime';

const VerticalCard = ({ data }: { data: IUserTrailLists }) => {
  const navigate = useNavigate();
  const [isUserLiked, setIsUserLiked] = useState(data.isLike);
  const [walkingTrailUid, setWalkingTrailUid] = useState('1');

  const { mutate: likeAction } = useMutate(
    'walking-trail/like',
    `/walking-trail/like/${walkingTrailUid}`,
    'patch'
  );

  const handleLikeClick = (id: string, isLiked: boolean) => {
    setWalkingTrailUid(id);
    likeAction(
      { like: !isLiked },
      {
        onSuccess: () => {
          setIsUserLiked(!isLiked);
        },
      }
    );
  };

  const onClickPage = () => {
    navigate(`/trail/select/${data.walkingTrailUid}`);
  };

  return (
    <Card key={data.walkingTrailId}>
      <Text5>{data.userUid.slice(0, 3)}의 산책길</Text5>
      <ImageContainer>
        <img
          src={walkingReportThumbnail}
          alt="dog"
          width={130}
          height={87}
          style={{ borderRadius: '12px' }}
        />
      </ImageContainer>

      <TitleWrapper onClick={onClickPage}>
        <img
          src={dogWalkingPicIcon}
          alt="dogWalkingPic"
          width={26}
          height={26}
        />
        <Text2>{data.name}</Text2>
      </TitleWrapper>
      <Info onClick={onClickPage}>
        <DescriptionTitle>산책 시간</DescriptionTitle>
        <DescriptionContent>{formatTime(data.time)}</DescriptionContent>
      </Info>
      <Info onClick={onClickPage}>
        <DescriptionTitle>산책 거리</DescriptionTitle>
        <DescriptionContent>{formatDistance(data.distance)}</DescriptionContent>
      </Info>

      <Rate onClick={onClickPage}>
        <img src={startIcon} alt="star" width={24} height={24} />
        {data.rating ? formatRating(String(data.rating)) : '0.0'}
        <img src={peopleIcon} alt="people" width={24} height={24} />
        {data.reviewCount ? formatReviewCount(data.reviewCount) : '0,000'}
      </Rate>
      <HeartIcon
        $isLiked={data.isLike}
        onClick={() => handleLikeClick(data.walkingTrailUid, data.isLike)}
      >
        <img src={isUserLiked ? redHeartIcon : heartIcon} alt="heart" />
      </HeartIcon>
    </Card>
  );
};

export default VerticalCard;
