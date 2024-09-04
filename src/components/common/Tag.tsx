import React from 'react';
import styled from 'styled-components';

interface TagProps {
  visibility: string;
  width: string;
  height: string;
  fontSize: string;
}

const getBackgroundColor = (visibility: string) => {
  switch (visibility) {
    case '전체공개':
      return '#00AE80';
    case '친구만':
      return '#9F64FF';
    case '비공개':
      return '#283330';
    default:
      return '#00AE80';
  }
};

const StyledTag = styled.div<TagProps>`
  width: ${(props) => props.width || '56px'};
  height: ${(props) => props.height || '16px'};
  font-size: ${(props) => props.fontSize || '12px'};
  border-radius: 100px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 10px;
  background-color: ${(props) => getBackgroundColor(props.visibility)};
`;

function Tag({ visibility, width, height, fontSize }: TagProps) {
  return (
    <StyledTag
      visibility={visibility}
      width={width}
      height={height}
      fontSize={fontSize}
    >
      {visibility === 'PUBLIC'
        ? '전체공개'
        : visibility === 'PROTECTED'
          ? '친구만'
          : '비공개'}
    </StyledTag>
  );
}

export default Tag;
