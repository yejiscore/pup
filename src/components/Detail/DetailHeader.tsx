// src/components/DetailHeader.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import MeatballsIcon from '../../assets/meatball.png';
import TrashIcon from '../../assets/trash.png';
import BackIcon from '../../assets/Left.png';
import { useAppContext } from '../../context/AppContext';
import DeleteModal from '../Modal/DeleteModal';
import { DataItem } from '../../types/DataItem';

const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  position: relative;
`;

const TitleContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const Title = styled.div`
  font-size: 18px;
  color: #283330;
  text-align: center;
`;

const IconButton = styled.img`
  cursor: pointer;
`;

const BackButton = styled.img`
  cursor: pointer;
`;

function DetailHeader() {
  const { id } = useParams<{ id: string }>();
  const { myData, setMyData, likeData, setLikeData } = useAppContext();
  const navigate = useNavigate();
  const [isTrashIcon, setIsTrashIcon] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleIconClick = () => {
    if (isTrashIcon) {
      setShowDeleteModal(true);
    } else {
      setIsTrashIcon(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setIsTrashIcon(false);
  };

  const item: DataItem | undefined =
    myData.find((data) => data.walkingTrailId === Number(id)) ||
    likeData.find((data) => data.walkingTrailId === Number(id));

  if (!item) {
    return <div>Data not found</div>;
  }

  const handleDelete = () => {
    if (myData.some((data) => data.walkingTrailId === Number(id))) {
      setMyData(myData.filter((data) => data.walkingTrailId !== Number(id)));
    } else if (likeData.some((data) => data.walkingTrailId === Number(id))) {
      setLikeData(
        likeData.filter((data) => data.walkingTrailId !== Number(id))
      );
    }
    navigate(-1);
  };

  return (
    <Container>
      <BackButton src={BackIcon} alt="Back" onClick={handleBackClick} />
      <TitleContainer>
        <Title>{item.name}</Title>
      </TitleContainer>
      <IconButton
        src={isTrashIcon ? TrashIcon : MeatballsIcon}
        alt="Options"
        onClick={handleIconClick}
      />
      {showDeleteModal && (
        <DeleteModal onClose={handleCloseDeleteModal} onDelete={handleDelete} />
      )}
    </Container>
  );
}

export default DetailHeader;
