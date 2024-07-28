import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import {
  formatDistance,
  formatRating,
  formatTime,
} from '../../utils/formatTime';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import holThumbnail from '../../assets/common/holThumbnail.png';
import startIcon from '../../assets/common/star.png';
import linkIcon from '../../assets/common/link.png';
import { IUserTrailLists } from '../../types/getUserTrailListsType';
import { BaseText2, BaseText3 } from '../../styles/common/textStyle';
import selectTrailState from '../../stores/selectTrail';
import linkShareState from '../../stores/linkShare';
import arrowCircleIcon from '../../assets/common/arrowCircle.png';
import useMutate from '../../hooks/useMutate';

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 20px;
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
    font-weight: 700;
    line-height: 14px;
    line-height: 16.38px;
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
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;

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

const HorizontalCard = ({ data }: { data: IUserTrailLists }) => {
  const navigate = useNavigate();
  const selectTrail = useSetRecoilState(selectTrailState);
  const setLinkShare = useSetRecoilState(linkShareState);

  const handleShowPopup = (url: string) => {
    setLinkShare({ isLinkShare: true, shareUrl: url });
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
    setMainImage(holThumbnail);
  };

  return (
    <Card key={data.walkingTrailId}>
      <img
        src={mainImage}
        alt="thumbnail"
        width={69}
        height={88}
        onError={handeleError}
        style={{ borderRadius: '12px' }}
      />
      <ContentWrapper>
        <TopWrapper>
          <span className="name">{data.userUid.slice(0, 3)}의 산책길</span>
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
          <span className="name">{data.userUid.slice(0, 3)}의 산책길</span>
          <Rate>
            <img src={startIcon} alt="star" width={24} height={24} />
            <span className="rating">
              {data.rating ? formatRating(String(data.rating)) : '0,0'}
            </span>
          </Rate>
        </NameRatingWrapper>
      </ContentWrapper>
      <LinkImg
        src={linkIcon}
        onClick={() =>
          handleShowPopup(
            `https://www.domountainbe.shop/trail/select/${data.walkingTrailUid}`
          )
        }
      />
      <GoPageImg
        src={arrowCircleIcon}
        onClick={() => onClickPage(data.walkingTrailUid, data.itemList)}
      />
    </Card>
  );
};

export default HorizontalCard;
