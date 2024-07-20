import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import BackIcon from '../../assets/common/back.png';
import CloseIcon from '../../assets/common/close.png';
import MapIcon from '../../assets/common/map.png';
import startIcon from '../../assets/common/star.png';
import linkIcon from '../../assets/common/link.png';
import { Text2 } from '../../styles/WalkintSreachStyle/SearchTopCom';
import walkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import { BaseBody4, BaseText3 } from '../../styles/common/textStyle';
import peopleIcon from '../../assets/common/people.png';
import searchDataState from '../../stores/searchDataState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 0 50px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1000px;
  /* min-width: 291px; */
  width: 291px;
  height: 38px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  /* width: 100%; */
  width: 291px;
  margin-left: 10px;
  font-weight: 400;
  font-size: 16px;
  line-height: 18.72px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const CloseImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-right: 10px;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const MapWrapper = styled.div`
  display: flex;
  width: 320px;
  align-items: center;
  justify-content: end;
  /* margin-right: 150px; */
`;

const MapImg = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
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
  justify-content: space-between;
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
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${(props) => props.theme.colors.darkGray};
  /* padding: 0 12px; */
  justify-content: space-between;
  margin-top: 9px;
`;

const LinkImg = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const SearchResult = () => {
  const [serachData, setSearchData] = useRecoilState(searchDataState);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const onGoMap = () => {
    navigate('/search_map');
  };
  const onClickIsSeach = () => {
    setSearchData({
      ...serachData,
      search: '',
      isSearch: false,
    });
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
    <Container>
      <Box>
        <Icon src={BackIcon} alt="Back" onClick={onClickIsSeach} />
        <SearchBox>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="검색어"
          />
          <CloseImg src={CloseIcon} alt="Clear" onClick={handleClearSearch} />
        </SearchBox>
      </Box>
      <MapWrapper>
        <MapImg src={MapIcon} alt="Map" onClick={onGoMap} />
      </MapWrapper>
      {dummyData.map((data) => (
        <Card key={data.id} onClick={onGoMap}>
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
                <img src={startIcon} alt="star" width={16} height={16} />
                {data.rate}
                <img
                  src={peopleIcon}
                  alt="people"
                  width={16}
                  height={16}
                  style={{ marginLeft: '5px' }}
                />
                {data.isWorked ? '0,000' : '0,000'}
              </Rate>
            </NameRatingWrapper>
          </ContentWrapper>
          <LinkImg src={linkIcon} />
        </Card>
      ))}
    </Container>
  );
};

export default SearchResult;
