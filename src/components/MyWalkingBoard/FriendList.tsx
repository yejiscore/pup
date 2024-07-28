import React from 'react';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { IFriendListType } from '../../types/friendType';
import dogProfileIcon from '../../assets/friend/dogProfile.png';
import userIcon from '../../assets/friend/userProfile.png';
import { UserDataType } from '../../types/authType';

const FriendListContainer = styled.div`
  padding: 10px;
`;

const FriendCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
`;

const FriendInfo = styled.div`
  flex-grow: 1;
  margin-left: 10px;
`;

const FriendName = styled.div`
  font-weight: bold;
`;

const FriendDescription = styled.div`
  color: #666;
`;

const FriendDate = styled.div`
  color: #00ae80;
  font-size: 12px;
`;

const FriendIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const ArrowIcon = styled.div`
  font-size: 18px;
  color: #00ae80;
`;

const FriendList = () => {
  const { data: userData } = useFetch<UserDataType>('/user', '/user', {});

  const { data: friendData } = useFetch<IFriendListType>(
    '/friend',
    '/friend',
    {
      name: userData?.data.userId,
    },
    !!userData
  );

  return (
    <FriendListContainer>
      {friendData &&
        friendData.data.map((friend) => (
          <FriendCard key={friend.friendId}>
            <FriendIcon src={friend.profile || userIcon} alt="Profile" />
            <FriendInfo>
              <FriendName>회원 {friend.userUid}</FriendName>
              <FriendDescription>{friend.description}</FriendDescription>
              <FriendDate>최근 산책일 {friend.lastWakingDate}</FriendDate>
            </FriendInfo>
            <ArrowIcon>➔</ArrowIcon>
          </FriendCard>
        ))}
    </FriendListContainer>
  );
};

export default FriendList;
