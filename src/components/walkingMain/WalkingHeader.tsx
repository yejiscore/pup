import React from 'react';
import styled from 'styled-components';
import {
  Header as StyledHeader,
  WeatherInfo,
} from '../../styles/WalkingMainStyle';
import useWeather from '../../services/wearth/waethService';
import RealTimeClock from './RealTimeClock';
import { BaseBody2 } from '../../styles/common/textStyle';

const Body1 = styled(BaseBody2)`
  font-weight: 400;
  line-height: 23.87px;
  color: ${({ theme }) => theme.colors.darkGray};
`;

const WalkingHeader = ({
  basePosition,
}: {
  basePosition: { lat: number; lng: number };
}) => {
  const { data, isLoading, error } = useWeather(
    basePosition.lat,
    basePosition.lng
  ); // 서울의 위도와 경도 예시
  if (isLoading) return <div>Loading...</div>;
  if (error) {
    // console.log(error);
    return <div>Error...</div>;
  }
  return (
    <StyledHeader>
      <WeatherInfo>
        <RealTimeClock />
        <img
          src={data?.weatherIconAdrs}
          alt="weather icon"
          width={40}
          height={40}
        />
        <Body1>{data?.temp}°C</Body1>
      </WeatherInfo>
    </StyledHeader>
  );
};

export default WalkingHeader;

// "message": "Please note that using One Call 3.0 requires a separate subscription to the One Call by Call plan. Learn more here https://openweathermap.org/price. If you have a valid subscription to the One Call by Call plan, but still receive this error, then please see https://openweathermap.org/faq#error401 for more info."
