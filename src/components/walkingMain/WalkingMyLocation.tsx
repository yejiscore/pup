import React from 'react';
import {
  MyLocation as StyledMyLocation,
  ImageButton,
} from '../../styles/WalkingMainStyle';
import locationIcon from '../../assets/map/locationOff.png';
import locationOnIcon from '../../assets/map/locationOn.png';

const WalkingMyLocation = ({
  onClick,
  isActive = false,
}: {
  onClick: () => void;
  isActive: boolean | null;
}) => (
  <StyledMyLocation onClick={onClick}>
    <ImageButton
      src={isActive ? locationOnIcon : locationIcon}
      alt="location"
    />
  </StyledMyLocation>
);

export default WalkingMyLocation;
