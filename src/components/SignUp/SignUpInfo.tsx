/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FC, useState, useEffect, RefObject } from 'react';
import styled from 'styled-components';
import Uploadplace from '../../assets/login/uploadplace.png';
import BottomArrow from '../../assets/login/bottom.png';

const Container = styled.div`
  width: 100%;
  height: 100%;
  top: 49px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #283330;
  margin-bottom: 10px;
  align-self: flex-start;
`;

const ImageNameContainer = styled.div`
  height: 101px;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 30px;
`;

const ImageContainer = styled.div`
  width: 101px;
  height: 101px;
  margin: 20px 0 20px 20px;
  cursor: pointer;
  overflow: none;
`;

const PetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PetImagePlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const HiddenInput = styled.input`
  display: none;
`;

const NameInputLabel = styled.label`
  font-size: 14px;
  color: #283330;
  margin-bottom: 15px;
`;

const NameInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 40px;
  flex: 1;
  margin-top: 29px;
`;

const NameInput = styled.input`
  width: cal(100%-100px);
  height: 39px;
  border-radius: 100px;
  background-color: white;
  padding-left: 20px;
  border: 1px solid #ccc;
  outline: none;
  margin-right: 50px;
  font-size: 14px;

  &::placeholder {
    color: #ccc;
  }
`;

const BirthContainer = styled.div`
  align-items: center;
  margin: 40px 0 0 20px;
  position: relative;
  font-size: 14px;
  color: #283330;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const Select = styled.select<{ isSelected: boolean }>`
  width: 90px;
  height: 32px;
  border-radius: 100px;
  background-color: white;
  padding: 0 10px;
  border: none;
  margin-top: 5px;
  margin-right: 5px;
  outline: none;
  color: ${(props) => (props.isSelected ? 'black' : '#ccc')};
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(${BottomArrow});
  background-repeat: no-repeat;
  background-position: right 10px center;
  font-size: 18px;
  gap: 3px;

  &::placeholder {
    color: #ccc;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SelectOption = styled.option`
  color: black;
`;

const Span = styled.span`
  font-size: 16px;
  color: #00ae80;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 30px;
`;

const NeuteringContainer = styled.div`
  height: 27px;
  display: flex;
  align-items: center;
  margin: 50px 30px 0 20px;
  position: relative;
  justify-content: space-between;
`;

const NeuteringButton = styled.button<{ selected: boolean }>`
  width: 71px;
  height: 27px;
  background-color: ${(props) => (props.selected ? '#00ae80' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'black')};
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 18px;
  margin-right: 20px;

  &:last-of-type {
    margin-right: 0;
  }
`;

interface SignUpInfoProps {
  petImage: string | null;
  setPetImage: (image: string | null) => void;
  neutered: string;
  setNeutered: (value: string) => void;
  petNameRef: RefObject<HTMLInputElement>;
  petYearRef: RefObject<HTMLSelectElement>;
  petMonthRef: RefObject<HTMLSelectElement>;
  petDayRef: RefObject<HTMLSelectElement>;
}

const SignUpInfo: FC<SignUpInfoProps> = ({
  petImage,
  setPetImage,
  neutered,
  setNeutered,
  petNameRef,
  petYearRef,
  petMonthRef,
  petDayRef,
}) => {
  const [yearSelected, setYearSelected] = useState<boolean>(false);
  const [monthSelected, setMonthSelected] = useState<boolean>(false);
  const [daySelected, setDaySelected] = useState<boolean>(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPetImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <Container>
      <ImageNameContainer>
        <ImageContainer>
          <HiddenInput
            type="file"
            accept="image/*"
            id="pet-image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="pet-image-upload">
            {petImage ? (
              <PetImage src={petImage} alt="Pet" />
            ) : (
              <PetImagePlaceholder>
                <img src={Uploadplace} alt="Upload Placeholder" />
              </PetImagePlaceholder>
            )}
          </label>
        </ImageContainer>

        <NameInputContainer>
          <NameInputLabel htmlFor="pet-name">반려견 이름</NameInputLabel>
          <NameInput
            id="pet-name"
            type="text"
            placeholder="반려견 이름을 등록해 주세요."
            ref={petNameRef}
          />
        </NameInputContainer>
      </ImageNameContainer>

      <BirthContainer>
        <InputLabel>반려견 생일</InputLabel>
        <DateContainer>
          <Select
            defaultValue=""
            isSelected={yearSelected}
            onChange={(e) => setYearSelected(!!e.target.value)}
            ref={petYearRef}
          >
            <option value="" disabled>
              연도
            </option>
            <SelectOption value="unknown">모름</SelectOption>
            {years.map((year) => (
              <SelectOption key={year} value={year}>
                {year}
              </SelectOption>
            ))}
          </Select>
          <Span>년</Span>
          <Select
            defaultValue=""
            isSelected={monthSelected}
            onChange={(e) => setMonthSelected(!!e.target.value)}
            ref={petMonthRef}
          >
            <option value="" disabled>
              월
            </option>
            <SelectOption value="unknown">모름</SelectOption>
            {months.map((month) => (
              <SelectOption key={month} value={month}>
                {month}
              </SelectOption>
            ))}
          </Select>
          <Span>월</Span>
          <Select
            defaultValue=""
            isSelected={daySelected}
            onChange={(e) => setDaySelected(!!e.target.value)}
            ref={petDayRef}
          >
            <option value="" disabled>
              일
            </option>
            <SelectOption value="unknown">모름</SelectOption>
            {days.map((day) => (
              <SelectOption key={day} value={day}>
                {day}
              </SelectOption>
            ))}
          </Select>
          <Span>일</Span>
        </DateContainer>
      </BirthContainer>

      <NeuteringContainer>
        <InputLabel style={{ marginBottom: 0 }}>중성화 여부</InputLabel>
        <div>
          <NeuteringButton
            selected={neutered === 'yes'}
            onClick={() => setNeutered('yes')}
          >
            예
          </NeuteringButton>
          <NeuteringButton
            selected={neutered === 'no'}
            onClick={() => setNeutered('no')}
          >
            아니오
          </NeuteringButton>
        </div>
      </NeuteringContainer>
    </Container>
  );
};

export default SignUpInfo;
