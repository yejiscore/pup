import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input<{ hasError: boolean }>`
  width: calc(100% - 60px);
  height: 40px;
  border-radius: 100px;
  background-color: white;
  padding-left: 20px;
  border: 2px solid;
  outline: none;
  border-color: ${(props) => (props.hasError ? 'red' : 'white')};
  margin: 10px auto;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? 'red' : '#283330')};
  }
`;

type InputProps = {
  id: string;
  type: string;
  placeholder: string;
  hasError: boolean;
  register: any;
};

const Input: React.FC<InputProps> = ({
  id,
  type,
  placeholder,
  hasError,
  register,
}) => {
  return (
    <StyledInput
      id={id}
      type={type}
      placeholder={placeholder}
      hasError={hasError}
      {...register}
    />
  );
};

export default Input;
