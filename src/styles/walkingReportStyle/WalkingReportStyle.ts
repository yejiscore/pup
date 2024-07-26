import styled, { css } from 'styled-components';
import { BaseBody4, BaseHead4 } from '../common/textStyle';

export const MiddlewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding-top: 20px;
`;

export const Head4 = styled(BaseHead4)`
  color: ${(props) => props.theme.colors.primary[5]};
  font-weight: 400;
  line-height: 26.25px;
  width: 40px;
`;

export const ComBoxOne = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  position: relative;
  margin-bottom: 30px;

  .firstBox {
    width: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
`;

export const CharCount = styled.span`
  margin-left: 8px;
  font-size: 14px;
  line-height: 16.71px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.offGray};
  margin-top: 20px;
`;

export const Input = styled.input<{ $isEditing: boolean }>`
  margin-left: 12px;
  border: none;
  font-size: 22px;
  line-height: 26.25px;
  font-weight: 600;
  width: 244px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.darkGray};
  padding: 3px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.offGray};
    font-size: 16px;
    line-height: 18.72px;
    font-weight: 400;
  }

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.offGray};
    font-size: 16px;
    line-height: 18.72px;
    font-weight: 400;
  }

  &::-moz-placeholder {
    color: ${({ theme }) => theme.colors.offGray};
    font-size: 16px;
    line-height: 18.72px;
    font-weight: 400;
  }

  &:-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.offGray};
    font-size: 16px;
    line-height: 18.72px;
    font-weight: 400;
  }

  ${({ $isEditing, theme }) =>
    $isEditing &&
    css`
      border-radius: 14px;
      width: 224px;
      border: 1px solid ${theme.colors.darkGray};
      background-color: ${theme.colors.white};
      color: ${theme.colors.darkGray};
    `}
  &:disabled {
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

export const BtnImage = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  justify-content: flex-start;
`;

export const ComBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    margin-bottom: 12px;
  }
`;

export const MarginBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  /* background-color: red; */
  .title {
    margin-left: 40px;
  }
`;

export const Body3 = styled(BaseBody4)`
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 600;
  line-height: 26.25px;
  margin-left: 12px;
  font-size: 22px;
`;

export const TimeDistance = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
`;

export const ButtonMemo = styled.button`
  width: 336px;
  height: 44px;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.colors.darkGray};
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 40px;
`;

export const Text = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 11px;
  line-height: 26.25px;
`;

export const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  margin-top: 10px;
  height: 214px;
  padding-bottom: 50px;

  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* margin-right: 40px; */
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const ToggleButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 336px; */
  height: 42px;
  border-radius: 25px;
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  overflow: hidden;
`;

export const ToggleButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary[5] : props.theme.colors.white};
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.primary[5]};
  border: none;
  outline: none;
  cursor: pointer;
  width: 110px;
  height: 42px;
  font-size: 22px;
  padding: 0;

  &:not(:last-child) {
    border-right: 2px solid ${(props) => props.theme.colors.primary[5]};
  }

  &:first-child {
    border-radius: 25px 0 0 25px;
  }

  &:last-child {
    border-radius: 0 25px 25px 0;
  }
`;

export const RegisterButton = styled.button`
  width: 336px;
  height: 64px;
  border-radius: 100px;
  background-color: ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.white};
  border: none;
  font-size: 24px;
  font-weight: 700;
  line-height: 30.24px;
  cursor: pointer;
  /* margin-right: 40px; */
`;

export const MemoTextArea = styled.textarea`
  width: 326px;
  height: 200px;
  max-height: 729px;
  min-height: 200px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 12px;
  margin-right: 40px;
  padding: 5px 10px;
  border: none;
  margin-bottom: 34px;
`;

export const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 120px;
  position: relative;
  /* background-color: black; */

  .slick-slider {
    margin-left: 20px;
    margin-top: 12px;
    height: 100%;
  }

  .slick-list {
    height: 100%;
    overflow: hidden; /* Add this line */
    display: flex;
    justify-content: flex-start; /* Add this line */
  }

  .slick-track {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100% !important;
    display: flex;
    justify-content: flex-start; /* Add this line */
  }

  .slick-slide {
    display: flex;
    justify-content: flex-start; /* Add this line */
    width: 100px; /* Modify this line to match the width of ImageWrapper */
    margin: 0 10px;
  }
`;

export const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
`;
export const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ButtonTitleHead4 = styled(BaseHead4)`
  width: 100%;
  font-size: 22px;
  line-height: 26.25px;
  font-weight: 400;
  margin-top: 20px;
  color: ${(props) => props.theme.colors.primary[5]};
`;
