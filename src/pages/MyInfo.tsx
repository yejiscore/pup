import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅을 추가합니다.
import styled from 'styled-components';
import EditButton from '../assets/login/editbutton.png';
import Profil from '../assets/profil.png';
import defaultImage from '../assets/login/dogimage.png';

const MyContainer = styled.div`
  width: 100%;
`;

const DogContainer = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
`;

const Spacer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 20px;
`;

const Title = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  color: #00ae80;
  font-size: 22px;
`;

const EditIcon = styled.img`
  margin-top: 20px;
  width: 30px;
  height: 30px;
  margin-right: 20px;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ProfilImg = styled.img`
  margin-top: 20px;
  margin-left: 40px;
  width: 86px;
  height: 86px;
`;

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 20px;
  margin-left: 20px;
  height: 50px;
`;

const Row1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 280px;
  color: #283330;
  font-size: 18px;
  width: 180px;
`;

const Row2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 300px;
  color: #283330;
  font-size: 14px;
`;

const PetContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;

const PetInfoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px;
`;

const PetImage = styled.img`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  object-fit: cover;
`;

const PetName = styled.div`
  font-size: 14px;
  color: #283330;
  text-align: center;
  margin-top: 5px;
`;

const PetAge = styled.div`
  font-size: 14px;
  color: #283330;
  text-align: center;
`;

const MyInfo = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 선언합니다.

  const [profileImage, setProfileImage] = useState(Profil);
  const [introduction, setIntroduction] = useState('자기소개를 입력하세요.');
  const [uid] = useState('일이삼사오육칠팔구십');

  return (
    <>
      <MyContainer>
        <Spacer />
        <HeaderContainer>
          <Title>나의 프로필</Title>
          <EditIcon
            src={EditButton}
            alt="Edit Button"
            onClick={() => navigate('/edit_user')}
          />
        </HeaderContainer>
        <Info>
          <ProfilImg src={profileImage} alt="Profil" />
          <RowsContainer>
            <Row1>{uid}</Row1>
            <Row2>{introduction}</Row2>
          </RowsContainer>
        </Info>
      </MyContainer>
      <Spacer />
      <DogContainer>
        <HeaderContainer>
          <Title>나의 반려견</Title>
          <EditIcon
            src={EditButton}
            alt="Edit Button"
            onClick={() => navigate('/edit_pet')}
          />
        </HeaderContainer>
        <PetContainer>
          <PetInfoCard>
            <PetImage src={defaultImage} alt="PetImage" />
            <PetName>펫네임</PetName>
            <PetAge>00살</PetAge>
          </PetInfoCard>
        </PetContainer>
      </DogContainer>
      <Spacer />
    </>
  );
};

export default MyInfo;
