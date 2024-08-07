import React, { useState } from 'react';
import styled from 'styled-components';
import profilGreenIcon from '../../assets/profilGreen.png';
import { DogType } from '../../types/dogTypes';
import checkgreenIcon from '../../assets/common/checkgreen.png';
import radiocheckIcon from '../../assets/common/radiocheck.png';
import { formatDateDay } from '../../utils/formatTime';
import penIcon from '../../assets/pen.png';
import EditDog from '../profile/EditDog';

const DogCard = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const DogImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 20px;
  background-color: #f0f0f0;
`;

const DogInfo = styled.div`
  flex: 1;
`;

const DogName = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: ${(props) => props.theme.colors.primary[5]};
`;

const DogInfoBottomBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
`;

const DogDetails = styled.div`
  font-size: 14px;
  line-height: 16.71px;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 400;
`;

const DogStatusWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const DogStatus = styled.div`
  font-size: 14px;
  color: #00ae80;
  margin-left: 20px;
  margin-right: 5px;
`;

const EditIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  border-radius: 100px;
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const DogCardVer = ({ dog }: { dog: DogType }) => {
  const [dogImage, setDogImage] = useState<string>(
    dog.profile || profilGreenIcon
  );
  const [isEditing, setIsEditing] = useState(false);

  const handleImageError = () => {
    setDogImage(profilGreenIcon);
  };

  return (
    <>
      <DogCard key={dog.dogId}>
        <DogImage src={dogImage} alt="반려견" onError={handleImageError} />
        <DogInfo>
          <DogName>{dog.name}</DogName>
          <DogInfoBottomBox>
            <DogDetails>{formatDateDay(dog.birth)}</DogDetails>
            <DogStatusWrapper>
              <DogStatus>중성화</DogStatus>
              {dog.isNeutered ? (
                <img src={checkgreenIcon} alt="중성화" width={17} height={17} />
              ) : (
                <img
                  src={radiocheckIcon}
                  alt="비중성화"
                  width={17}
                  height={17}
                />
              )}
              <EditIcon
                src={penIcon}
                alt="수정팬"
                onClick={() => setIsEditing(!isEditing)}
              />
            </DogStatusWrapper>
          </DogInfoBottomBox>
        </DogInfo>
      </DogCard>
      {isEditing && (
        <EditDog dog={dog} onClose={() => setIsEditing(!isEditing)} />
      )}
    </>
  );
};

export default DogCardVer;
