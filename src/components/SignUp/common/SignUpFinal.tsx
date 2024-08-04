// src/components/SignUp/SignUpFinal.tsx
import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundImage from '../../../assets/login/welcome.png';
import defaultImage from '../../../assets/login/dogimage.png';
import Header from './Header';
import StartButton from '../button/StartButton';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const FinalContainer = styled.div`
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  position: relative;
`;

const ContentContainer = styled.div`
  width: 281px;
  height: 400px;
  position: relative;
  margin: 60px auto;
  margin-bottom: 0px;
`;

const Welcome = styled.div`
  font-size: 24px;
  color: #00ae80;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 22px;
  color: #283330;
`;

const ImageContainer = styled.div`
  position: absolute;
  bottom: 0px;
  left: 30px;
`;

const Image = styled.img`
  width: 281px;
  height: 400px;
  object-fit: contain;
`;

const InfoContainer = styled.div`
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

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

interface PetDetail {
  id: string;
  petImage: string | null;
  petName: string;
  petBirthday: string;
  neutered: string;
}

const SignUpFinal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { petDetails } = location.state || { petDetails: [] };

  const calculateAge = (birthday: string) => {
    if (birthday === 'unknown') return '모름';
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  const handleStartWalking = () => {
    navigate('/walking_main', { state: { petDetails } });
  };

  return (
    <Container>
      <Header />
      <FinalContainer>
        <ContentContainer>
          <Welcome>환영합니다!</Welcome>
          <Text>
            반려견과 함께
            <br />
            즐거운 산책 되세요!
          </Text>
          <ImageContainer>
            <Image src={BackgroundImage} alt="Welcome" />
          </ImageContainer>
        </ContentContainer>
        <InfoContainer>
          {petDetails.map((pet: PetDetail) => (
            <PetInfoCard key={pet.id}>
              <PetImage src={pet.petImage || defaultImage} alt={pet.petName} />
              <PetName>{pet.petName}</PetName>
              <PetAge>{calculateAge(pet.petBirthday)}살</PetAge>
            </PetInfoCard>
          ))}
        </InfoContainer>
        <ButtonContainer>
          <StartButton onClick={handleStartWalking}>산책 시작하기</StartButton>
        </ButtonContainer>
      </FinalContainer>
    </Container>
  );
};

export default SignUpFinal;
