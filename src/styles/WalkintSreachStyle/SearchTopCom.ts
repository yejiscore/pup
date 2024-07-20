import styled from 'styled-components';
import {
  BaseBody1,
  BaseText2,
  BaseText3,
  BaseText5,
} from '../common/textStyle';

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  /* background-color: #edf9f6; */
  border-radius: 1000px;
  height: 38px;
  width: 100%;
  justify-content: center;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 1000px;
  height: 38px;
  width: 299px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.32px;
  color: ${(props) => props.theme.colors.offGray};
  &::placeholder {
    color: #b7cac4;
  }
  &:focus {
    outline: none;
  }
`;

export const Icon = styled.img`
  width: 36px;
  height: 36px;
  /* margin: 0 10px; */
`;

export const TopCom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 339px;
  position: relative;

  .slick-slider {
    margin-left: 20px;
    margin-top: 12px;
  }

  .slick-slide {
    width: 154px;
    margin: 0 7px;
  }
`;

export const Body1 = styled(BaseBody1)`
  font-weight: 700;
  line-height: 23.87px;
  margin-left: 20px;
  margin-top: 20px;
  text-align: left;
`;

export const Card = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  /* background-color: red; */
  border-radius: 20px;
  width: 154px;
  height: 263px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Text5 = styled(BaseText5)`
  font-weight: 400;
  line-height: 14.32px;
  text-align: left;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 12px;
  margin-top: 10px;
  margin-bottom: 5px;
`;

export const ImageContainer = styled.div`
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 12px;
  margin-top: 20px;
`;

export const Text2 = styled(BaseText2)`
  font-weight: 400;
  line-height: 16.71px;
  margin-left: 5px;
`;

export const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 12px;
  margin-top: 9px;
`;

export const DescriptionTitle = styled(Text2)`
  font-size: 14px;
  font-weight: 400;
  line-height: 16.71px;
  color: ${(props) => props.theme.colors.primary[5]};
`;

export const DescriptionContent = styled(BaseText3)`
  font-size: 14px;
  font-weight: 600;
  line-height: 16.38px;
  color: ${(props) => props.theme.colors.darkGray};
`;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.72px;
  color: ${(props) => props.theme.colors.darkGray};
  padding: 0 12px;
  justify-content: space-between;
  margin-top: 9px;
`;

export const HeartIcon = styled.div<{ $isLiked: boolean }>`
  position: absolute;
  top: 28px;
  right: 12px;
  font-size: 24px;
  color: ${(props) =>
    props.$isLiked ? props.theme.colors.white : props.theme.colors.primary[5]};
  cursor: pointer;
`;
