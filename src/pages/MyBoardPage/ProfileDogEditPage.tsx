/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import dogWhiteIcon from '../../assets/dogWhite.png';
import cameraIcon from '../../assets/common/camera.png';
import plusIcon from '../../assets/common/plus.png';
import closeIcon from '../../assets/common/close.png';
import useFetch from '../../hooks/useFetch';
import { ResDogType } from '../../types/dogTypes';
import { UserDataType } from '../../types/authType';
import BaseBox from '../../styles/common/BaseBox';
import DogCardVer from '../../components/MyWalkingBoard/DogCardVer';
import AddDog from '../../components/profile/AddDog';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ProfileDogEditContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const CloseIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  color: ${(props) => props.theme.colors.darkGray};
`;

const DogList = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const AddDogButton = styled.button<{ $addDog: boolean }>`
  width: 175px;
  height: 34px;
  padding: 0;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary[3]};
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  font-weight: 400;
  line-height: 18.72px;
  border: none;
  display: ${(props) => (props.$addDog ? 'none' : 'flex')};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom: 20px;

  .plus {
    margin-bottom: 5px;
    margin-right: 5px;
  }
`;

const ProfileDogEditPage = () => {
  const navigate = useNavigate();
  const [addDog, setAddDog] = useState(false);
  const { data: userData } = useFetch<UserDataType>('/user', '/user', {});
  const { data: dogData } = useFetch<ResDogType>('/dog', '/dog', {});

  const handleAddDog = () => {
    setAddDog(!addDog);
  };
  return (
    <BaseBox>
      <ProfileDogEditContainer>
        <Container>
          <Header>
            <CloseIcon
              src={closeIcon}
              alt="닫기"
              onClick={() => navigate('/')}
            />
            <Title>내 산책보드</Title>
            <div />
          </Header>

          <DogList>
            {dogData &&
              dogData.data.map((dog, index) => (
                <div key={dog.dogId}>
                  <DogCardVer dog={dog} />
                </div>
              ))}
          </DogList>
        </Container>

        <AddDogButton onClick={handleAddDog} $addDog={addDog}>
          <img
            src={plusIcon}
            className="plus"
            alt="반려견 추가"
            width={26}
            height={26}
          />
          반려견 추가하기
        </AddDogButton>
        {addDog && <AddDog handleAddDog={handleAddDog} />}
      </ProfileDogEditContainer>
    </BaseBox>
  );
};

export default ProfileDogEditPage;
