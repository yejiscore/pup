import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import myBoardUserIcon from '../../assets/myboardUser.png';
import profilePicIcon from '../../assets/profilPic.png';
import penIcon from '../../assets/pen.png';
import useFetch from '../../hooks/useFetch';
import { UserDataType } from '../../types/authType';
import { DogType, ResDogType } from '../../types/dogTypes';
import DogCard from './DogCard';
import goIcon from '../../assets/go.png';

const Container = styled.div`
  padding: 20px;
  width: 90%;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  padding: 20px;
`;

const TopSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary[5]};
  line-height: 25.74px;
  font-weight: 400;
  margin-bottom: 10px;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  height: 86px;
`;

const ProfileImage = styled.img`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  height: 70px;
  flex: 1;
`;

const ProfileName = styled.div`
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
  margin-bottom: 5px;
  height: 30px;
`;

const ProfileDetails = styled.div`
  font-size: 14px;
  color: ${(props) => props.theme.colors.darkGray};
  line-height: 16.71px;
  font-weight: 400;
  height: 40px;
`;

const PetsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; //
`;

const AccountManagement = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
`;

const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.theme.colors.white};
  /* margin: 20px 0; */
  padding: 0;
`;

const TopkSectionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const GoLinkImg = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const Profile = () => {
  const navigate = useNavigate();
  const { data: userData } = useFetch<UserDataType>('/user', '/user', {});
  const { data: dogData } = useFetch<ResDogType>('/dog', '/dog', {});

  const [profileImg, setProfileImg] = useState<string>(
    userData?.data.profile ?? ''
  );
  const handleErrorProfle = () => {
    setProfileImg(profilePicIcon);
  };

  useEffect(() => {
    if (userData && userData.data.profile) {
      setProfileImg(userData.data.profile);
    }
  }, [userData]);

  const goProfileEditPage = () => {
    navigate('/profile/user/edit');
  };
  const goDogEditPage = () => {
    navigate('/profile/dog/edit');
  };

  return (
    <Container>
      <Section>
        <TopSectionWrapper>
          <SectionTitle>나의 프로필</SectionTitle>
          <GoLinkImg
            src={penIcon}
            alt="penIcon"
            width={30}
            height={30}
            onClick={goProfileEditPage}
          />
        </TopSectionWrapper>
        <ProfileContainer>
          <ProfileImage
            src={profileImg}
            alt="Profile"
            width={86}
            height={86}
            onError={handleErrorProfle}
          />
          <ProfileInfo>
            <ProfileName>{userData?.data.userUid}</ProfileName>
            <ProfileDetails>{userData?.data.description}</ProfileDetails>
          </ProfileInfo>
        </ProfileContainer>
      </Section>
      <Line />
      <Section>
        <TopSectionWrapper>
          <SectionTitle>나의 반려견 ({dogData?.data.length})</SectionTitle>
          <GoLinkImg
            src={penIcon}
            alt="penIcon"
            width={30}
            height={30}
            onClick={goDogEditPage}
          />
        </TopSectionWrapper>

        <PetsContainer>
          {dogData?.data.map((dog) => (
            <div key={dog.dogId}>
              <DogCard dog={dog} />
            </div>
          ))}
        </PetsContainer>
      </Section>
      {/* <Section>
        <TopkSectionWrapper>
          <AccountManagement>계정관리</AccountManagement>
          <img
            src={goIcon}
            alt="penIcon"
            width={30}
            height={30}
            style={{ cursor: 'pointer' }}
          />
        </TopkSectionWrapper>
      </Section> */}
    </Container>
  );
};

export default Profile;
