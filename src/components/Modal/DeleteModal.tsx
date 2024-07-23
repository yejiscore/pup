/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import WarningIcon from '../../assets/warn.png';

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContainer = styled.div`
    width: 252px;
    height: 245px;
    background-color: white;
    // padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 18px;
`;

const WarningImage = styled.img`
    width: 40px;
    height: 40px;
    margin-top: 10px;
    margin-bottom: 16px;
`;

const Message = styled.p`
    font-size: 22px;
    color: #283330;
    text-align: center;
    margin: 0 0 8px 0;
    font-weight: bold;
`;

const SubMessage = styled.p`
    font-size: 18px;
    color: #283330;
    text-align: center;
    margin: 0 0 24px 0;
`;

const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 16px;
`;

const Button = styled.button`
    width: 94px;
    height: 36px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 20px;
    border: 2px solid #00ae80;
    opacity: 1;
    margin-left: 5px;
    margin-right: 5px;
`;

const CancelButton = styled(Button)`
    background-color: transparent;
    color: #00ae80;
`;

const DeleteButton = styled(Button)`
    background-color: #00ae80;
    color: white;
`;

interface ModalProps {
    onClose: () => void;
    onDelete: () => void;
}

const DeleteModal: React.FC<ModalProps> = ({ onClose, onDelete }) => (
    <Overlay>
        <ModalContainer>
            <WarningImage src={WarningIcon} alt="Warning" />
            <Message>
                선택한 산책보드를 정말
                <br />
                삭제하시겠습니까?
            </Message>
            <SubMessage>
                산책보드를 삭제하면
                <br />
                복구가 불가능해요.
            </SubMessage>
            <ButtonGroup>
                <CancelButton onClick={onClose}>취소</CancelButton>
                <DeleteButton onClick={onDelete}>삭제</DeleteButton>
            </ButtonGroup>
        </ModalContainer>
    </Overlay>
);

export default DeleteModal;
