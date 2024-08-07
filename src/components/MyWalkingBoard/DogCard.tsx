import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { DogType } from '../../types/dogTypes';
import prfileGreenIcon from '../../assets/profilGreen.png';
import { calculateAge } from '../../utils/formatTime';

const PetCard = styled.div`
  width: calc(25% - 10px);
  margin-bottom: 10px;
  text-align: center;
  border-radius: 10px;
  padding: 10px;
  height: 137px;
  width: 76px;
`;

const PetImage = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const PetName = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 14px;
  line-height: 16.38px;
  font-weight: 600;
`;

const PetAge = styled.div`
  font-size: 14px;
  line-height: 16.71px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
`;

const DogCard = ({ dog }: { dog: DogType }) => {
  const [dogImg, setDogImg] = useState<string>(dog.profile || prfileGreenIcon);

  const hadleImgError = () => {
    setDogImg(prfileGreenIcon);
  };

  return (
    <PetCard key={dog.dogId}>
      <PetImage src={dogImg} alt="Pet" onError={hadleImgError} />
      <PetName>{dog.name}</PetName>
      <PetAge>{calculateAge(dog.birth)}살</PetAge>
    </PetCard>
  );
};

export default DogCard;
