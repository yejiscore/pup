/* eslint-disable react/require-default-props */
// // import React, { FC } from 'react';
// // import styled from 'styled-components';
// // import { useNavigate } from 'react-router-dom';

// // const Button = styled.button`
// //   width: 336px;
// //   height: 63px;
// //   background-color: #00ae80;
// //   color: white;
// //   font-size: 20px;
// //   font-weight: bold;
// //   border: none;
// //   border-radius: 100px;
// //   cursor: pointer;
// //   margin: 20px auto;
// // `;

// // const StartButton: FC = () => {
// //   const navigate = useNavigate();

// //   const handleStart = () => {
// //     navigate('/');
// //   };

// //   return <Button onClick={handleStart}>산책 시작하기</Button>;
// // };

// // export default StartButton;

// import React from 'react';
// import styled from 'styled-components';

// const Button = styled.button`
//   width: 336px;
//   height: 63px;
//   background-color: #00ae80;
//   color: white;
//   font-size: 20px;
//   font-weight: bold;
//   border: none;
//   border-radius: 100px;
//   cursor: pointer;
//   margin: 20px auto;
// `;

// interface StartButtonProps {
//   onClick: () => void;
// }

// const StartButton: React.FC<StartButtonProps> = ({ onClick }) => {
//   return <Button onClick={onClick}>산책 시작하기</Button>;
// };

// export default StartButton;

import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  width: 336px;
  height: 63px;
  background-color: #00ae80;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 20px;
`;

interface StartButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const StartButton: React.FC<StartButtonProps> = ({
  onClick,
  children = '산책 시작하기',
}) => {
  return <Button onClick={onClick}>{children}</Button>;
};

export default StartButton;
