/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import useMutate from '../../hooks/useMutate';
import uploadDataState from '../../stores/uploadDataState';

interface StartButtonProps {
  onClick: () => void;
  isModalOpen: boolean;
  buttonText: string;
}
const Button = styled.button<{ $isModalOpen: boolean }>`
  position: absolute;
  width: 335px;
  height: 63px;
  bottom: ${(props) => (props.$isModalOpen ? '50px' : '109px')};
  /* padding: 23px 103px; */
  gap: 10px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  box-shadow:
    0px 3px 6px 0px #37ae7f33,
    0px 10px 10px 0px #37ae7f2b,
    0px 23px 14px 0px #37ae7f1a,
    0px 41px 17px 0px #37ae7f08,
    0px 65px 18px 0px #37ae7f00;

  .text {
    cursor: pointer;
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
    letter-spacing: -1%;
  }
`;

const WalkingStartButton = ({
  onClick,
  isModalOpen,
  buttonText,
  onClose,
  dogsId,
}: {
  onClick: () => void;
  isModalOpen: boolean;
  buttonText: string;
  onClose?: () => void;
  dogsId?: number[];
}) => {
  const [uploadData, setUploadData] = useRecoilState(uploadDataState);

  const { mutate: reChagneDog } = useMutate(
    'rechage',
    'walking-trail/dog',
    'patch'
  );

  const handleReChagneDog = () => {
<<<<<<< HEAD
    console.log('reChagneDog', uploadData);
=======
>>>>>>> feature/develop
    reChagneDog(
      {
        walkingTrailUid: uploadData.walkingTrailUid,
        dogIdList: dogsId,
      },
      {
        onSuccess: () => {
          if (onClose) {
            onClose();
          }
        },
      }
    );
  };

  return (
    <Button onClick={onClick} $isModalOpen={isModalOpen}>
      {buttonText === '산책으로 돌아가기' ? (
        <span className="text" onClick={handleReChagneDog}>
          {buttonText}
        </span>
      ) : (
        <span className="text">{buttonText}</span>
      )}
    </Button>
  );
};

export default WalkingStartButton;
