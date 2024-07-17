import React from 'react';
import {
  Header as StyledHeader,
  WeatherInfo,
} from '../../styles/WalkingMainStyle';

const WalkingHeader = () => (
  <StyledHeader>
    <WeatherInfo>
      <div>06 : 27</div>
      <div>💧</div>
      <div>30°C</div>
    </WeatherInfo>
  </StyledHeader>
);

export default WalkingHeader;
