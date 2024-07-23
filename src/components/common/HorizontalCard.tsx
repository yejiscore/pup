import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { formatDistance, formatTime } from '../../utils/formatTime';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import holThumbnail from '../../assets/common/holThumbnail.png';
import startIcon from '../../assets/common/star.png';
import linkIcon from '../../assets/common/link.png';
import { IUserTrailLists } from '../../types/getUserTrailListsType';
import { BaseText2, BaseText3 } from '../../styles/common/textStyle';

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
`;

const HorizontalCard = ({ data }: { data: IUserTrailLists }) => {
  const navigate = useNavigate();
  const onGoDetail = () => {
    navigate(`/trail/select/${data.walkingTrailId}`);
  };

  return (
    <Card key={data.walkingTrailId}>
      <img
        src={holThumbnail}
        alt="thumbnail"
        width={69}
        height={88}
        style={{ borderRadius: '12px' }}
      />
      <ContentWrapper onClick={onGoDetail}>
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
            <span className="rating">{data.rating}</span>
          </Rate>
        </NameRatingWrapper>
      </ContentWrapper>
      <LinkImg src={linkIcon} />
    </Card>
  );
};

export default HorizontalCard;
