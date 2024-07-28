/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC } from 'react';
import styled from 'styled-components';
import defaultImage from '../../../assets/login/dogimage.png';
import editIcon from '../../../assets/login/editbutton.png';
import neuteredYesIcon from '../../../assets/login/neucheck.png';
import neuteredNoIcon from '../../../assets/login/neuuncheck.png';

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-items: center;
`;

const DetailContainer = styled.div`
  width: 336px;
  height: 66px;
  background-color: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 5px;
`;

const ImageContainer = styled.div`
  width: 43px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #edf9f6;
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const PetName = styled.div`
  font-size: 18px;
  color: #00ae80;
`;

const PetDetails = styled.div`
  font-size: 14px;
  color: #283330;
  display: flex;
  align-items: center;
`;

const EditButton = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const NeuteredIcon = styled.img`
  width: 17px;
  height: 17px;
  margin-left: 5px;
`;

const BirthdayText = styled.div`
  min-width: 150px; /* Minimum width to ensure consistency */
`;

interface SignUpDetailProps {
  petImage?: string;
  petName: string;
  petBirthday: string;
  neutered: string;
  onEdit: () => void;
}

const SignUpDetail: FC<SignUpDetailProps> = ({
  petImage,
  petName,
  petBirthday,
  neutered,
  onEdit,
}) => {
  const formattedBirthday =
    petBirthday === 'unknown'
      ? '모름'
      : petBirthday
          .split('-')
          .map((value, index) => {
            if (index === 0) return `${value}년`;
            if (index === 1) return `${value.padStart(2, '0')}월`;
            return `${value.padStart(2, '0')}일`;
          })
          .join(' ');

  return (
    <Container>
      <DetailContainer>
        <ImageContainer>
          <PetImage src={petImage || defaultImage} alt="Pet" />
        </ImageContainer>
        <InfoContainer>
          <PetName>{petName}</PetName>
          <PetDetails>
            <BirthdayText>{formattedBirthday}</BirthdayText>
            <span style={{ color: '#00ae80', marginLeft: '10px' }}>중성화</span>
            <NeuteredIcon
              src={neutered === 'yes' ? neuteredYesIcon : neuteredNoIcon}
              alt="Neutered"
            />
          </PetDetails>
        </InfoContainer>
        <EditButton src={editIcon} alt="Edit" onClick={onEdit} />
      </DetailContainer>
    </Container>
  );
};

SignUpDetail.defaultProps = {
  petImage: undefined,
};

export default SignUpDetail;
