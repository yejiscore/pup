import React from 'react';
import styled from 'styled-components';

const StyledErrorMessage = styled.span<{ visible: boolean }>`
  color: #ff603e;
  font-size: 12px;
  margin-left: 34px;
  height: 16px;
  display: block;
  margin-top: 5px;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

type ErrorMessageProps = {
  visible: boolean;
  children: React.ReactNode;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ visible, children }) => {
  return <StyledErrorMessage visible={visible}>{children}</StyledErrorMessage>;
};

export default ErrorMessage;
