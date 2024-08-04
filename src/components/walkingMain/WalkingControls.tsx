import React from 'react';
import {
  Controls as StyledControls,
  ControlButton,
  ImageButton,
} from '../../styles/WalkingMainStyle';
import plusIcon from '../../assets/map/plus.png';
import minusIcon from '../../assets/map/minus.png';

const WalkingControls = ({
  onZoomIn,
  onZoomOut,
}: {
  onZoomIn: () => void;
  onZoomOut: () => void;
}) => (
  <StyledControls>
    <ControlButton onClick={onZoomIn}>
      <ImageButton src={plusIcon} alt="plus" />
    </ControlButton>
    <ControlButton onClick={onZoomOut}>
      <ImageButton src={minusIcon} alt="minus" />
    </ControlButton>
  </StyledControls>
);

export default WalkingControls;
