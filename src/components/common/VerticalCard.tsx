import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  BottomBtnWrapper,
  Card,
  DescriptionContent,
  DescriptionTitle,
  GoTrailBtn,
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
import selectTrailState from '../../stores/selectTrail';

const VerticalCard = ({ data }: { data: IUserTrailLists }) => {
  const navigate = useNavigate();
  const [isUserLiked, setIsUserLiked] = useState(data.isLike);
  const [walkingTrailUid, setWalkingTrailUid] = useState('1');
  const selectTrail = useSetRecoilState(selectTrailState);

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

  const onClickPage = (id: string, item: any) => {
    selectTrail({
      selectId: id,
      name: data.name,
      lat: item.length > 0 ? item[0].lat : 37.4971,
      lng: item.length > 0 ? item[0].lng : 127.0276,
    });
    navigate('/search/map');
  };

  const [mainImage, setMainImage] = useState(data.mainImage ?? '');
  const handeleError = () => {
    setMainImage(walkingReportThumbnail);
  };

  return (
    <Card key={data.walkingTrailId}>
      <Text5>{data.userUid.slice(0, 3)}의 산책길</Text5>
      <ImageContainer>
        <img
          src={mainImage}
          alt="dog"
          width={130}
          height={87}
          onError={handeleError}
          style={{ borderRadius: '12px' }}
        />
      </ImageContainer>

      <TitleWrapper>
        <img
          src={dogWalkingPicIcon}
          alt="dogWalkingPic"
          width={26}
          height={26}
        />
        <Text2>{data.name}</Text2>
      </TitleWrapper>
      <Info>
        <DescriptionTitle>산책 시간</DescriptionTitle>
        <DescriptionContent>{formatTime(data.time)}</DescriptionContent>
      </Info>
      <Info>
        <DescriptionTitle>산책 거리</DescriptionTitle>
        <DescriptionContent>{formatDistance(data.distance)}</DescriptionContent>
      </Info>

      <Rate>
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
      <BottomBtnWrapper
        onClick={() => onClickPage(data.walkingTrailUid, data.itemList)}
      >
        <GoTrailBtn type="button">산책하러가기</GoTrailBtn>
      </BottomBtnWrapper>
    </Card>
  );
};

export default VerticalCard;
