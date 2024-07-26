import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import BackIcon from '../../assets/common/back.png';
import CloseIcon from '../../assets/common/close.png';
import MapIcon from '../../assets/common/map.png';
import startIcon from '../../assets/common/star.png';
import linkIcon from '../../assets/common/link.png';
import { Text2 } from '../../styles/WalkintSreachStyle/SearchTopCom';
import holThumbnail from '../../assets/common/holThumbnail.png';
import { BaseBody4, BaseText2, BaseText3 } from '../../styles/common/textStyle';
import peopleIcon from '../../assets/common/people.png';
import searchDataState from '../../stores/searchDataState';
import useFetch from '../../hooks/useFetch';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import {
  formatDistance,
  formatRating,
  formatReviewCount,
  formatTime,
} from '../../utils/formatTime';
import downIcon from '../../assets/common/down.png';
import selectTrailState from '../../stores/selectTrail';
import linkShareState from '../../stores/linkShare';

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
  justify-content: space-between;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.primary[5]};
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  border-radius: 100px;
  padding: 5px 16px 5px 12px;
  width: 115px;
  height: 29px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 30px;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.primary[5]};
  border-radius: 12px;
  overflow: hidden;
  z-index: 1000;

  button {
    width: 100%;
    background-color: inherit;
    border: none;
    color: ${(props) => props.theme.colors.primary[5]};
    padding: 8px 16px;
    cursor: pointer;
    font-size: 18px;
    line-height: 22px;
    font-weight: 400;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary[2]};
    }
  }
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

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 203px;
  height: 36px;
  margin-top: 14px;

  .name {
    font-weight: 600;
    line-height: 14px;
    line-height: 16.38px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.colors.primary[5]};
  }

  .content {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    line-height: 22px;
    color: ${(props) => props.theme.colors.darkGray};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
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
  font-weight: 600;
  line-height: 16.38px;
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

  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${(props) => props.theme.colors.darkGray};

  img {
    margin-bottom: 2px;
  }
`;

const LinkImg = styled.img`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const SearchResult = () => {
  const [baseName, setBaseName] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('RECENT');
  const setLinkShare = useSetRecoilState(linkShareState);

  const handleShowPopup = (url: string) => {
    setLinkShare({ isLinkShare: true, shareUrl: url });
  };

  const { data: trailData } = useFetch<ResIUserTrailLists>(
    `[trailData/search/${name}${type}]`,
    '/walking-trail/search',
    {
      name,
      type,
    }
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('전체');
  const selectTrail = useSetRecoilState(selectTrailState);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const [serachData, setSearchData] = useRecoilState(searchDataState);

  const navigate = useNavigate();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBaseName(e.target.value);
  };

  const handleClearSearch = () => {
    setBaseName('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setName(baseName);
    }
  };

  const onGoMap = () => {
    navigate('/search/map');
  };
  const onClickIsSeach = () => {
    setSearchData({
      ...serachData,
      search: '',
      isSearch: false,
    });
  };

  const onGoDetail = (id: string, item: any, selectName: string) => {
    selectTrail({
      selectId: id,
      name: selectName,
      lat: item.length > 0 ? item[0].lat : 0,
      lng: item.length > 0 ? item[0].lng : 0,
    });
    navigate('/search/map');
  };

  return (
    <Container>
      <Box>
        <Icon src={BackIcon} alt="Back" onClick={onClickIsSeach} />
        <SearchBox>
          <SearchInput
            type="text"
            value={baseName}
            onChange={handleSearchChange}
            onKeyDown={handleKeyPress}
            placeholder="검색어"
          />
          <CloseImg src={CloseIcon} alt="Clear" onClick={handleClearSearch} />
        </SearchBox>
      </Box>
      <MapWrapper>
        <DropdownWrapper>
          <DropdownButton onClick={toggleDropdown}>
            <img src={downIcon} alt="arrow" width={19} height={19} />
            {selectedOption}
          </DropdownButton>
          {isOpen && (
            <DropdownMenu>
              <button type="button" onClick={() => handleOptionClick('전체')}>
                전체공개
              </button>
              <button type="button" onClick={() => handleOptionClick('좋아요')}>
                좋아요
              </button>
              <button
                type="button"
                onClick={() => handleOptionClick('이용자순')}
              >
                이용자순
              </button>
              <button type="button" onClick={() => handleOptionClick('최신순')}>
                최신순
              </button>
              <button type="button" onClick={() => handleOptionClick('과거순')}>
                과거순
              </button>
            </DropdownMenu>
          )}
        </DropdownWrapper>
        <MapImg src={MapIcon} alt="Map" onClick={onGoMap} />
      </MapWrapper>
      {trailData &&
        name &&
        trailData.data.map((data) => (
          <Card key={data.walkingTrailId}>
            <img
              src={holThumbnail}
              alt="thumbnail"
              width={69}
              height={88}
              style={{ borderRadius: '12px' }}
            />
            <ContentWrapper
              onClick={() =>
                onGoDetail(data.walkingTrailUid, data.itemList, data.name)
              }
            >
              <TopWrapper>
                <span className="name">
                  {data.userUid.slice(0, 3)}의 산책길
                </span>
                <span className="content">{data.name}</span>
              </TopWrapper>

              <InfoWrapper>
                <Info>
                  <DescriptionTitle>시간</DescriptionTitle>
                  <DescriptionContent>
                    {formatTime(data.time)}
                  </DescriptionContent>
                </Info>
                <Info>
                  <DescriptionTitle>거리</DescriptionTitle>
                  <DescriptionContent>
                    {formatDistance(data.distance)}
                  </DescriptionContent>
                </Info>
              </InfoWrapper>
              <NameRatingWrapper>
                <span className="name">
                  {data.userUid.slice(0, 3)}의 산책길
                </span>
                <Rate>
                  <img src={startIcon} alt="star" width={16} height={16} />
                  {data.rating ? formatRating(String(data.rating)) : '0.0'}
                  <img
                    src={peopleIcon}
                    alt="people"
                    width={16}
                    height={16}
                    style={{ marginLeft: '5px' }}
                  />
                  {data.reviewCount
                    ? formatReviewCount(data.reviewCount)
                    : '0,000'}
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
          </Card>
        ))}
    </Container>
  );
};

export default SearchResult;
