import React from 'react';
import {
  MyLocation as StyledMyLocation,
  ImageButton,
} from '../../styles/WalkingMainStyle';
import locationIcon from '../../assets/map/locationOff.png';

const WalkingMyLocation = ({ onClick }: { onClick: () => void }) => (
  <StyledMyLocation onClick={onClick}>
    <ImageButton src={locationIcon} alt="location" />
  </StyledMyLocation>
);

export default WalkingMyLocation;
