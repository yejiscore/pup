import React from 'react';
import styled from 'styled-components';
import ListImage from '../images/Property 1=list.png';

const ListContainer = styled.div`
  width: 100%;
  height: 567px;
  top: 98px;
  bottom: 49px;
  padding: 16px 20px;
  gap: 10px;
  opacity: 1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  overflow-y: auto;
`;

const ListItem = styled.div`
  width: 336px;
  height: 116px;
  gap: 0px;
  border-radius: 16px;
  padding: 8px;
  display: flex;
  background-color: white;
  margin-left: 10px;
  margin-bottom: 10px;
  position: relative;
`;

const ItemImage = styled.img`
  width: 69px;
  height: 88px;
  border-radius: 12px;
  margin-right: 10px;
  margin-top: 14px;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: calc(100% - 79px);
  height: 70%;
  margin-top: 14px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Date = styled.div`
  font-size: 14px;
  color: #888;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Info = styled.div`
  font-size: 10px;
  color: #888;
`;

const Tag = styled.div`
  background-color: #e0f7fa;
  color: #00796b;
  font-size: 6px;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 8px;
`;

const Nickname = styled.div`
  font-size: 6px;
  color: #888;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  font-size: 6px;
  color: #ffb300;
`;

const ExternalLink = styled.div`
  margin-left: auto;
  color: #00796b;
  cursor: pointer;
`;

interface WalkListProps {
  data: {
    id: number;
    date: string;
    title: string;
    time: string;
    distance: string;
    visibility: string;
    nickname: string;
    rating: number;
  }[];
}

function WalkList({ data }: WalkListProps) {
  return (
    <ListContainer>
      {data.map((item) => (
        <ListItem key={item.id}>
          <ItemImage src={ListImage} alt="list item" />
          <ItemContent>
            <Row>
              <Date>{item.date}</Date>
              <ExternalLink>🔗</ExternalLink>
            </Row>
            <Title>{item.title}</Title>
            <Row>
              <Info>
                시간 {item.time} 거리 {item.distance}
              </Info>
            </Row>
            <Row>
              <Tag>{item.visibility}</Tag>
              <Nickname>{item.nickname}</Nickname>
              <Rating>⭐ {item.rating}</Rating>
            </Row>
          </ItemContent>
        </ListItem>
      ))}
    </ListContainer>
  );
}

export default WalkList;
