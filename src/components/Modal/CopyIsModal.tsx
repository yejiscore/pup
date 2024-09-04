// SharePopup.tsx
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import linkShareState from '../../stores/linkShare';

const PopupContainer = styled.div`
  height: 150px;
  width: 252px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  /* padding: 20px; */
  border-radius: 18px;
  z-index: 1000;
  text-align: center;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const TopBox = styled.div`
  width: 252px;
  height: 88px;
  text-align: center;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  span {
    font-size: 22px;
    line-height: 28px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.darkGray};
    margin-bottom: 5px;
  }
`;

const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 20px;
  line-height: 23.87px;
  align-items: center;
  font-weight: 400;
  padding: 0;
  width: 94px;
  height: 36px;
  &.cancel {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary[5]};
    border: 1px solid ${({ theme }) => theme.colors.primary[5]};
  }
  &.copy {
    background-color: ${({ theme }) => theme.colors.primary[5]};
    color: ${({ theme }) => theme.colors.white};
    border: none;
  }
`;

const SharePopup = () => {
  const [linkShare, setLinkShare] = useRecoilState(linkShareState);

  const handleClose = () => {
    setLinkShare({ isLinkShare: false, shareUrl: '' });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(linkShare.shareUrl).then(
      () => {
        alert('주소 복사됨!');
        setLinkShare({ isLinkShare: false, shareUrl: '' });
      },
      (err) => {
        console.error('Failed to copy: ', err);
      }
    );
  };

  if (!linkShare.isLinkShare) return null;

  return (
    <>
      <Overlay onClick={handleClose} />
      <PopupContainer>
        <TopBox>
          <span>멋진 산책이에요!</span> <span>친구들과 공유해보세요!</span>
        </TopBox>
        <Button className="cancel" onClick={handleClose}>
          괜찮아요
        </Button>
        <Button className="copy" onClick={handleCopy}>
          주소복사
        </Button>
      </PopupContainer>
    </>
  );
};

export default SharePopup;
