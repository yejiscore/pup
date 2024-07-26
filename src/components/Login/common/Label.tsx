import React, { FC } from 'react';
import styled from 'styled-components';

const StyledLabel = styled.label`
  align-self: flex-start;
  margin-left: 20px;
  font-size: 14px;
  color: #283330;
`;

type LabelProps = {
  htmlFor: string;
  children: React.ReactNode;
};

const Label: FC<LabelProps> = ({ htmlFor, children }) => {
  return <StyledLabel htmlFor={htmlFor}>{children}</StyledLabel>;
};

export default Label;
