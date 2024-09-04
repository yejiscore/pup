<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components';
import MeatballsIcon from '../../assets/meatball.png';
import TrashIcon from '../../assets/trash.png';
import { useAppContext } from '../../context/AppContext';
=======
import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import MeatballsIcon from '../../assets/meatball.png';
import TrashIcon from '../../assets/trash.png';
import { useAppContext } from '../../context/AppContext';
import {
  deleteIdListState,
  isTrashIconState,
} from '../../stores/myBoardState/myBoardState';
import useMutate from '../../hooks/useMutate';
import WarnIcon from '../../assets/warn.png';
>>>>>>> feature/develop

const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
`;

const Title = styled.div`
  font-size: 18px;
  color: #283330;
  margin: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const IconButton = styled.img`
  width: 40px;
  height: 40px;
  opacity: 1;
  cursor: pointer;
  position: absolute;
  right: 16px;
`;

<<<<<<< HEAD
function Header() {
  const { isTrashIcon, toggleTrashIcon, selectedItems, openModal } =
    useAppContext();

  const handleIconClick = () => {
    if (isTrashIcon) {
      if (selectedItems.length === 0) {
        toggleTrashIcon();
      } else {
        openModal();
      }
    } else {
      toggleTrashIcon();
    }
  };

=======
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  width: 252px;
  height: 245px;
  border-radius: 18px;

  .topWrapper {
    height: 183px;
  }

  .titleWrapper {
    margin-top: 12px;
  }

  .title {
    font-size: 22px;
    font-weight: 600;
    line-height: 26.25px;
    text-align: center;
  }

  .contentWrapper {
    margin-top: 12px;
  }

  .content {
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  width: 94px;
  height: 36px;
  border-radius: 100px;
  cursor: pointer;
  font-size: 20px;
  line-height: 23.87px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  &:first-child {
    background: ${(props) => props.theme.colors.white};
    border: 2px solid ${(props) => props.theme.colors.primary[5]};
    color: ${(props) => props.theme.colors.primary[5]};
  }
  &:last-child {
    background: ${(props) => props.theme.colors.primary[5]};
    color: ${(props) => props.theme.colors.white};
  }
`;

function Header() {
  const [isTrashIcon, toggleTrashIcon] = useRecoilState(isTrashIconState);
  const [deleteIdList, setDeleteIdList] = useRecoilState(deleteIdListState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteMyBoardCardMutate } = useMutate(
    'deleteMyBoardCard',
    '/walking-trail',
    'newdelete'
  );

  const handleIconClick = () => {
    if (deleteIdList.length > 0) {
      setIsModalOpen(true);
    } else {
      toggleTrashIcon(!isTrashIcon);
    }
  };

  const handleConfirmDelete = () => {
    const walkingTrailIdList = deleteIdList;

    deleteMyBoardCardMutate(
      { walkingTrailIdList },
      {
        onSuccess: () => {
          setDeleteIdList([]);
          toggleTrashIcon(!isTrashIcon);
          setIsModalOpen(false);
        },
        onError: () => {
          alert('삭제에 실패했습니다.');
          setIsModalOpen(false);
        },
      }
    );
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

>>>>>>> feature/develop
  return (
    <Container>
      <Title>내 산책보드</Title>
      <IconButton
        src={isTrashIcon ? TrashIcon : MeatballsIcon}
        onClick={handleIconClick}
      />
<<<<<<< HEAD
=======
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <div className="topWrapper">
              <img src={WarnIcon} alt="Warning" width={40} height={40} />
              <div className="titleWrapper">
                <h2 className="title">선택한 산책보드를 정말</h2>
                <h2 className="title"> 삭제하시겠습니까?</h2>
              </div>
              <div className="contentWrapper">
                <p className="content">산책보드를 삭제하면</p>
                <p className="content"> 복구가 불가능해요.</p>
              </div>
            </div>

            <ButtonContainer>
              <Button onClick={handleCancelDelete}>취소</Button>
              <Button onClick={handleConfirmDelete}>삭제</Button>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
>>>>>>> feature/develop
    </Container>
  );
}

export default Header;
