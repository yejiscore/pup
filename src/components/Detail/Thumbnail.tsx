import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import DefaultThumbnail from '../../assets/Thumbnail.png';
import StarIcon from '../../assets/Star 2.png';
import Tag from '../common/Tag';
import LinkCopyIcon from '../../assets/LinkCopy2.png';
import CopyModal from '../Modal/CopyModal';
import { DataItem } from '../../types/DataItem'; // DataItem 타입 import

const ThumbnailContainer = styled.div`
  width: 100%;
  height: 281px;
  position: relative;
  background-color: #ccefe6;
  text-align: center;
  object-fit: cover;
`;

const ThumbnailImage = styled.img`
  object-fit: cover;
`;

const TopContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
`;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  color: #283330;
`;

const Star = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const RatingText = styled.div`
  font-size: 20px;
  color: white;
`;

const LinkCopyButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

function Thumbnail() {
  const { id } = useParams<{ id: string }>();
  const { myData, likeData } = useAppContext();
  const [showModal, setShowModal] = useState(false);

  const item: DataItem | undefined =
    myData.find((data) => data.walkingTrailId === Number(id)) ||
    likeData.find((data) => data.walkingTrailId === Number(id));

  if (!item) {
    return <div>Data not found</div>;
  }

  const image = item.image ? item.image : DefaultThumbnail;

  const handleOptionsClick = () => {
    setShowModal(true);
  };

  return (
    <ThumbnailContainer>
      <ThumbnailImage src={image} alt="Thumbnail" />
      <TopContainer>
        <Tag
          visibility={item.openRange || 'UNKNOWN'}
          width="74px"
          height="23px"
          fontSize="14px"
        />
      </TopContainer>
      <LinkCopyButton
        src={LinkCopyIcon}
        alt="Options"
        onClick={handleOptionsClick}
      />
      <CopyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        url={window.location.href}
      />
      <BottomContainer>
        <Star src={StarIcon} alt="star" />
        <RatingText>{item.rating !== null ? item.rating : 'N/A'}</RatingText>
      </BottomContainer>
    </ThumbnailContainer>
  );
}

export default Thumbnail;
