import React, { useState } from 'react';
import useInterval from 'use-interval';
import moment from 'moment';
import 'moment/locale/ko'; // 한국어 로케일을 사용하려면 추가합니다.
import styled from 'styled-components';
import { BaseBody2 } from '../../styles/common/textStyle';

const Body1 = styled(BaseBody2)`
  font-weight: 400;
  line-height: 23.87px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const RealTimeClock = () => {
  const [time, setTime] = useState(moment());

  useInterval(() => {
    setTime(moment());
  }, 1000); // 1초마다 시간 업데이트

  return <Body1>{time.format('HH:mm')}</Body1>;
};

export default RealTimeClock;
