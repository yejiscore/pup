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
  width: 22px;
  height: 22px;
  cursor: pointer;
  position: absolute;
  top: 14px;
  right: 17px;
`;

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

  return (
    <WalkListContainer>
      {isModalOpen && selectedItems.length > 0 && (
        <DeleteModal
          onClose={closeModal}
          onDelete={() => deleteSelectedItems(activeSubTab)}
        />
      )}
      {data.map((item) => (
        <ListItem
          key={item.walkingTrailId}
          isTrashIcon={isTrashIcon}
          onClick={() => handleItemClick(item.walkingTrailId)}
        >
          <ItemImage src={ListImage} alt="list item" />
          <ItemContent>
            <Row>
              <DateText>
                {new Date(item.createdDate).toLocaleDateString()}
              </DateText>
            </Row>
            <Title>{item.name || 'Untitled'}</Title>
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
                visibility={item.openRange || 'UNKNOWN'}
                width="56px"
                height="16px"
                fontSize="12px"
              />
              <Rating>
                <Star src={StarIcon} alt="star" />
                <RatingText>
                  {item.rating !== null ? item.rating : 'N/A'}
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

export default WalkList;
