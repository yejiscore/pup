<<<<<<< HEAD
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import ListImage from '../../assets/ListImage.png';
import LinkCopyIcon from '../../assets/LinkCopy1.png';
import HeartIcon from '../../assets/heart.png';
import SelectCircleIcon from '../../assets/Ellipse 8 (Stroke).png';
import SelectedCircleIcon from '../../assets/Group 58.png';
import { useAppContext } from '../../context/AppContext';
import DeleteModal from '../Modal/DeleteModal';
import StarIcon from '../../assets/Star 2.png';
import VisibilityTag from '../common/Tag';
import CopyModal from '../Modal/CopyModal';
import { DataItem } from '../../types/DataItem';
import useFetch from '../../hooks/useFetch';
import { IGetUserTrailType } from '../../types/getUserTrailType';
import { ResIUserTrailLists } from '../../types/getUserTrailListsType';
import { formatRating } from '../../utils/formatTime';

interface ListItemProps {
  isTrashIcon: boolean;
}

const WalkListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListItem = styled.div<ListItemProps>`
  width: 336px;
  height: 116px;
  gap: 0px;
  border-radius: 16px;
  display: flex;
  background-color: white;
  position: relative;
  margin: 10px auto;
  text-decoration: none;
  color: inherit;
  cursor: ${({ isTrashIcon }) => (isTrashIcon ? 'default' : 'pointer')};
`;

const ItemImage = styled.img`
  width: 69px;
  height: 88px;
  margin: 14px 0 0 10px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 203px;
  height: 88px;
  margin: 14px 0 0 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DateText = styled.div`
  font-size: 14px;
  color: #888;
  text-align: left;
`;

const Title = styled.div`
  font-size: 18px;
  text-align: left;
  font-weight: bold;
`;

const Time = styled.div`
  font-size: 12px;
  color: #00ae80;
  text-align: left;
  span {
    color: #283330;
    font-weight: bold;
    margin-left: 7px;
  }
`;

const Distance = styled.div`
  font-size: 12px;
  color: #00ae80;
  text-align: right;
  span {
    color: #283330;
    font-weight: bold;
    margin-left: 7px;
  }
`;

const Visibility = styled(VisibilityTag)``;

const UserUid = styled.div`
  font-size: 12px;
  color: #888;
  margin-left: 8px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #ffb300;
  margin-left: auto;
`;

const Star = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const RatingText = styled.div`
  font-size: 12px;
  color: #283330;
`;

const LinkCopyButton = styled.img`
=======
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
>>>>>>> feature/develop
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 17px;
`;

<<<<<<< HEAD
const SelectCircle = styled.img`
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 17px;
`;

interface WalkListProps {
  data: DataItem[];
  activeSubTab: string;
}

function WalkList({ data, activeSubTab }: WalkListProps) {
  const {
    isTrashIcon,
    isModalOpen,
    closeModal,
    selectedItems,
    toggleSelectItem,
    deleteSelectedItems,
  } = useAppContext();

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const handleItemClick = (id: number) => {
    if (!isTrashIcon) {
      navigate(`/detail/${id}`);
    }
  };

  const handleOptionsClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    setModalUrl(url);
    setShowModal(true);
  };

  const { data: myTrailData } = useFetch<ResIUserTrailLists>(
    'myTrailData',
    'walking-trail',
    {}
  );

  return (
    <WalkListContainer>
      {isModalOpen && selectedItems.length > 0 && (
        <DeleteModal
          onClose={closeModal}
          onDelete={() => deleteSelectedItems(activeSubTab)}
        />
      )}
      {myTrailData &&
        myTrailData.data.map((item) => (
          <ListItem
            key={item.walkingTrailUid}
            isTrashIcon={isTrashIcon}
            // onClick={() => handleItemClick(item.walkingTrailId)}
          >
            <ItemImage src={ListImage} alt="list item" />
            <ItemContent>
              <Row>
                <DateText>
                  {new Date(item.createdDate).toLocaleDateString()}
                </DateText>
              </Row>
              <Title>{item.name}</Title>
              <Row>
                <Time>
                  시간 <span>{item.time}분</span>
                </Time>
                <Distance>
                  거리 <span>{item.distance.toFixed(2)} km</span>
                </Distance>
              </Row>
              <Row>
                <Visibility
                  visibility={item.openRange}
                  width="56px"
                  height="16px"
                  fontSize="12px"
                />
                <Rating>
                  <Star src={StarIcon} alt="star" />
                  <RatingText>
                    {item.rating ? formatRating(String(item.rating)) : '0,0'}
                  </RatingText>
                </Rating>
              </Row>
            </ItemContent>
            {isTrashIcon ? (
              <SelectCircle
                src={
                  selectedItems.includes(item.walkingTrailId)
                    ? SelectedCircleIcon
                    : SelectCircleIcon
                }
                alt="select circle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSelectItem(item.walkingTrailId);
                }}
              />
            ) : (
              <>
                {activeSubTab === '찜한 산책로' ? (
                  <LinkCopyButton
                    src={HeartIcon}
                    alt="Heart Icon"
                    onClick={(e) =>
                      handleOptionsClick(
                        e,
                        `${window.location.origin}/detail/${item.walkingTrailId}`
                      )
                    }
                  />
                ) : (
                  <LinkCopyButton
                    src={LinkCopyIcon}
                    alt="Copy Link"
                    onClick={(e) =>
                      handleOptionsClick(
                        e,
                        `${window.location.origin}/detail/${item.walkingTrailId}`
                      )
                    }
                  />
                )}
                <CopyModal
                  show={showModal}
                  onClose={() => setShowModal(false)}
                  url={modalUrl}
                />
              </>
            )}
          </ListItem>
        ))}
    </WalkListContainer>
  );
}
=======
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
>>>>>>> feature/develop

export default WalkList;
