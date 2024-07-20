import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { BaseBody1, BaseBody4, BaseText3 } from '../../styles/common/textStyle';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import startIcon from '../../assets/common/star.png';
import linkIcon from '../../assets/common/link.png';
import { Text2 } from '../../styles/WalkintSreachStyle/SearchTopCom';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 20px;
`;

const Box = styled(Wrapper)`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled(BaseBody1)`
  font-weight: 700;
  line-height: 23.87px;
  margin-left: 20px;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .slick-slider {
    /* margin-left: 20px; */
    /* margin-top: 12px; */
    margin-right: 50px;
  }

  .slick-slide {
    width: 336px;
    margin: 0 20px;
  }
`;

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

const Body4 = styled(BaseBody4)`
  font-weight: 400;
  line-height: 22px;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8.5px;
  text-align: left;
`;

export const DescriptionTitle = styled(Text2)`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  color: ${(props) => props.theme.colors.primary[5]};
  margin-right: 10px;
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
  justify-content: end;
  align-items: center;

  .name {
    font-size: 12px;
    font-weight: 400;
    line-height: 14.32px;
    color: ${(props) => props.theme.colors.darkGray};
    margin-top: 10px;
  }
`;
const Rate = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.72px;
  color: ${(props) => props.theme.colors.darkGray};
  padding: 0 12px;
  justify-content: space-between;
  margin-top: 9px;
`;

const LinkImg = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const SearchBottomCom = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true, // 슬라이드 너비를 자동으로 조절
  };

  const dummyData = [
    {
      id: '124',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '00:12:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '00:11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
    {
      id: '34',
      name: 'asd',
      title: '일이삼사오륙칠팔구십일이삼',
      img: 'asd',
      desc: '일이삼사오륙칠팔구십일이삼',
      time: '11:00',
      distance: '1.2km',
      rate: 4.5,
      isWorked: 0.005,
    },
  ];
  return (
    <Wrapper>
      <Box>
        <Title>방금 산책했어요!</Title>
        <CardWrapper>
          <Slider {...settings}>
            {dummyData.map((data) => (
              <Card key={data.id}>
                <img
                  src={walkingReportThumbnail}
                  alt="thumbnail"
                  width={69}
                  height={88}
                  style={{ borderRadius: '12px' }}
                />
                <ContentWrapper>
                  <Body4>{data.title}</Body4>
                  <InfoWrapper>
                    <Info>
                      <DescriptionTitle>시간</DescriptionTitle>
                      <DescriptionContent>{data.time}</DescriptionContent>
                    </Info>
                    <Info>
                      <DescriptionTitle>거리</DescriptionTitle>
                      <DescriptionContent>{data.distance}</DescriptionContent>
                    </Info>
                  </InfoWrapper>
                  <NameRatingWrapper>
                    <span className="name">{data.name}의 산책길</span>
                    <Rate>
                      <img src={startIcon} alt="star" width={24} height={24} />{' '}
                      {data.rate}
                    </Rate>
                  </NameRatingWrapper>
                </ContentWrapper>
                <LinkImg src={linkIcon} />
              </Card>
            ))}
          </Slider>
        </CardWrapper>
      </Box>
    </Wrapper>
  );
};

export default SearchBottomCom;
