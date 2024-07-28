/* eslint-disable key-spacing */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Edit/Header';
import defaultImage from '../assets/login/dogimage.png';
import useMutate from '../hooks/useMutate';

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 49px;
  box-sizing: border-box;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
`;

const Uid = styled.div`
  margin-left: 20px;
  font-size: 18px;
  color: #283330;
`;

const IntroLabel = styled.div`
  margin: 20px;
  font-size: 18px;
  color: #00ae80;
`;

const IntroInput = styled.textarea`
  margin: 20px;
  width: calc(100% - 40px);
  height: 100px;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
`;

const SaveButton = styled.button`
  margin: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: #00ae80;
  border: none;
  cursor: pointer;
`;

const EditUser: FC = () => {
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [introduction, setIntroduction] = useState('');
  const [uid, setUid] = useState('uuid');
  const uploadedPhotoUrls = [] as string[];

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // const reader = new FileReader();
      // reader.onload = (event: any) => {
      //   setProfileImage(event.target.result);
      // };
      // reader.readAsDataURL(e.target.files[0]);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await axios.post(
          'https://web.hi-dice.com/api/file/v1/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        // console.log('response', response);
        if (response.data && response.data.data.url) {
          uploadedPhotoUrls.push(response.data.data.url);
        } else {
          // console.error(
          //   `Error uploading file ${file.name}: No URL in response`
          // );
        }
      } catch (uploadError) {
        // console.error(`Error uploading file ${file.name}:`, uploadError);
      }
    }
  };
  const { mutate: uploadUserInfomutate } = useMutate(
    'uploadUserInformation',
    '/user',
    'put'
  );
  const handleSave = () => {
    const data = {
      profile: profileImage,
      introduction,
    };
    // console.log('Saving data:', data);
    uploadUserInfomutate({
      profile: uploadedPhotoUrls[0] as any,
      description: introduction,
    });
  };

  return (
    <Container>
      <Header />
      <InfoContainer>
        <label htmlFor="profile-upload">
          <ProfileImage src={profileImage} alt="Profile" />
        </label>
        <input
          id="profile-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
        <Uid>{uid}</Uid>
      </InfoContainer>
      <IntroLabel>자기소개</IntroLabel>
      <IntroInput
        value={introduction}
        onChange={(e) => setIntroduction(e.target.value)}
      />
      <SaveButton onClick={handleSave}>저장</SaveButton>
    </Container>
  );
};

export default EditUser;
