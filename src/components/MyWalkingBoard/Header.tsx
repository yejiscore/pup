import React from 'react';
import styled from 'styled-components';
import MeatballsIcon from '../../assets/meatball.png';
import TrashIcon from '../../assets/trash.png';
import { useAppContext } from '../../context/AppContext';

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

    return (
        <Container>
            <Title>내 산책보드</Title>
            <IconButton
                src={isTrashIcon ? TrashIcon : MeatballsIcon}
                onClick={handleIconClick}
            />
        </Container>
    );
}

export default Header;
