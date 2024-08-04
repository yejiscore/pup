import React, { useEffect, useState } from 'react';
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
  const [date, setDate] = useState(moment().format('MM:DD'));

  useEffect(() => {
    const now = moment();
    setDate(now.format('MM:DD'));
  }, []);

  return <Body1>{date}</Body1>;
};

export default RealTimeClock;
