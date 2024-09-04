/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import closeIcon from '../../assets/common/close.png';
import BaseBox from '../../styles/common/BaseBox';
import profilePicIcon from '../../assets/profilPic.png';
import pen from '../../assets/pen.png';
import useFetch from '../../hooks/useFetch';
import { UserDataType } from '../../types/authType';
import useMutate from '../../hooks/useMutate';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const ProfileEditContainer = styled.div`
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
  /* margin-bottom: 20px; */
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

const SaveButton = styled.button`
  padding: 18px 103px;
  width: 100%;
  border-radius: 100px;
  border: none;
  background-color: ${(props) => props.theme.colors.primary[5]};
  font-size: 24px;
  line-height: 30.24px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 70px;
  margin-bottom: 20px;
  width: 100%;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 101px;
  height: 101px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: end;
  margin-top: 70px;
`;

const ProfileName = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary[5]};
`;

const EditIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  position: absolute;
  left: 80px;
  bottom: 0;
`;

const BioContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const BioWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const BioLabel = styled.label`
  display: block;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary[5]};
`;

const BioInput = styled.textarea`
  width: 95%;
  height: 60px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  resize: none;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  font-weight: 400;
  line-height: 18.72px;
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 14px;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 16.71px;
  font-weight: 400;
  margin-top: 5px;
`;

const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { data: userData } = useFetch<UserDataType>('/user', '/user', {});

  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState(profilePicIcon);
  const [uploadData, setUploadData] = useState<{ walkingPhotos: File[] }>({
    walkingPhotos: [],
  });

  const { mutate: userUpdate } = useMutate('/user', '/user', 'put');

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData({ walkingPhotos: [file] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async () => {
    try {
      const uploadedPhotoUrls: string[] = [];

      for (let i = 0; i < uploadData.walkingPhotos.length; i++) {
        const file = uploadData.walkingPhotos[i];
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

          if (response.data && response.data.data.url) {
            uploadedPhotoUrls.push(response.data.data.url);
            setProfileImage(response.data.data.url); // 이미지 URL 설정
          } else {
            console.error(
              `Error uploading file ${(file as File).name}: No URL in response`
            );
          }
        } catch (uploadError) {
          console.error(
            `Error uploading file ${(file as File).name}:`,
            uploadError
          );
        }
      }

      return uploadedPhotoUrls[0]; // 첫 번째 이미지 URL 반환
    } catch (error) {
      console.error('Error uploading photos:', error);
    }
  };

  const handleSave = async () => {
    // console.log('bio:', bio);
    const imageUrl = await handleRegister(); // 이미지 업로드 후 URL 반환

    if (imageUrl) {
      userUpdate(
        {
          description: bio,
          profile: imageUrl, // 반환된 URL 설정
        },
        {
          onSuccess: () => {
            navigate('/');
          },
          onError: (error) => {
            alert('저장에 실패했습니다');
          },
        }
      );
    }
  };
  return (
    <BaseBox>
      <Wrapper>
        <ProfileEditContainer>
          <Header>
            <CloseIcon
              src={closeIcon}
              alt="닫기"
              onClick={() => navigate('/')}
            />
            <Title>내 산책보드</Title>
            <div />
          </Header>

          <ProfileContainer>
            <ProfileImage src={profileImage} alt="프로필" />
            <ProfileInfo>
              {userData && <ProfileName>{userData.data.userUid}</ProfileName>}
              <label htmlFor="imageUpload">
                <EditIcon src={pen} alt="편집" />
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </ProfileInfo>
          </ProfileContainer>

          <BioContainer>
            <BioWrapper>
              <BioLabel>자기소개</BioLabel>
              <CharacterCount>{bio.length}/20</CharacterCount>
            </BioWrapper>
            <BioInput
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={20}
            />
          </BioContainer>

          <SaveButton onClick={handleSave}>저장하기</SaveButton>
        </ProfileEditContainer>
      </Wrapper>
    </BaseBox>
  );
};

export default ProfileEditPage;
