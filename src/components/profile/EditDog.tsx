/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import dogWhiteIcon from '../../assets/dogWhite.png';
import cameraIcon from '../../assets/common/camera.png';
import useMutate from '../../hooks/useMutate';
import { DogType } from '../../types/dogTypes';

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1900; year--) {
    yearOptions.push(
      <option key={year} value={year}>
        {year}년
      </option>
    );
  }
  return yearOptions;
};

const generateMonthOptions = () => {
  const monthOptions = [];
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0'); // '01', '02', ...
    monthOptions.push(
      <option key={monthStr} value={monthStr}>
        {monthStr}월
      </option>
    );
  }
  return monthOptions;
};

const generateDayOptions = () => {
  const dayOptions = [];
  for (let day = 1; day <= 31; day++) {
    const dayStr = day.toString().padStart(2, '0'); // '01', '02', ...
    dayOptions.push(
      <option key={dayStr} value={dayStr}>
        {dayStr}일
      </option>
    );
  }
  return dayOptions;
};

const formatBirthDate = (birth: {
  year: string;
  month: string;
  day: string;
}): string => {
  const { year, month, day } = birth;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

const FormContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const FormTopBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .topRight {
    margin-top: 40px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;
  }
`;

const FormLabel = styled.label`
  font-size: 14px;
  line-height: 16.38px;
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 400;
`;

const FormInput = styled.input`
  width: 219px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 100px;

  &::placeholder {
    font-size: 14px;
    line-height: 16.71px;
    color: ${(props) => props.theme.colors.offGray};
  }
`;

const BirthSelectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
  padding: 5px 10px;
  margin-right: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;

  & > select {
    border: none;
    outline: none;
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    appearance: none;
    background: none;
  }
`;

const Select = styled.select`
  width: 70px;
  flex: 1;
  padding: 5px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  background-color: transparent;
  appearance: none;
  ::placeholder {
    color: ${(props) => props.theme.colors.offGray};
  }
  color: ${(props) => props.theme.colors.offGray};
`;

const Span = styled.span`
  font-size: 16px;
  line-height: 18.72px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.primary[5]};
  margin-top: 20px;
  margin-right: 20px;
`;

const RadioWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const RadioGroup = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const RadioButton = styled.label`
  font-size: 14px;
`;

const RadioInput = styled.button<{ $checked: boolean }>`
  margin-right: 5px;
  padding: 0;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  background-color: ${({ $checked }) => ($checked ? '#00ae80' : 'white')};
  color: ${({ $checked }) => ($checked ? 'white' : 'black')};
  border: 1px solid ${({ $checked }) => ($checked ? '#00ae80' : '#ccc')};
  width: 71px;
  height: 27px;
  font-size: 18px;
  line-height: 22px;
  font-weight: 400;
`;

const AddButton = styled.button`
  cursor: pointer;
  width: 117px;
  height: 34px;
  border-radius: 100px;
  padding: 0;
  background-color: ${(props) => props.theme.colors.primary[3]};
  border: none;
  color: ${(props) => props.theme.colors.darkGray};
  font-size: 16px;
  line-height: 18.72px;
  font-weight: 400;
`;

const CancelButton = styled.button`
  cursor: pointer;
  width: 117px;
  height: 34px;
  border-radius: 100px;
  padding: 0;
  background-color: ${(props) => props.theme.colors.white};
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  color: ${(props) => props.theme.colors.primary[5]};
  font-size: 16px;
  line-height: 18.72px;
  font-weight: 400;
  margin-right: 20px;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const EditDog = ({ dog, onClose }: { dog: DogType; onClose: () => void }) => {
  const [dogName, setDogName] = useState(dog.name || '');
  const [dogBirth, setDogBirth] = useState({
    year: dog.birth ? dog.birth.split('-')[0] : '',
    month: dog.birth ? dog.birth.split('-')[1] : '',
    day: dog.birth ? dog.birth.split('-')[2] : '',
  });
  const [isNeutered, setIsNeutered] = useState(dog.isNeutered ? 'yes' : 'no');
  const [dogImage, setDogImage] = useState(dog.profile || dogWhiteIcon);
  const [uploadData, setUploadData] = useState<{ walkingPhotos: File[] }>({
    walkingPhotos: [],
  });
  const navigate = useNavigate();

  const onErrorImg = () => {
    setDogImage(dogWhiteIcon);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadData({ walkingPhotos: [file] });
      const reader = new FileReader();
      reader.onloadend = () => {
        setDogImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (uploadData.walkingPhotos.length === 0) return dog.profile;
    const formData = new FormData();
    formData.append('file', uploadData.walkingPhotos[0]);
    try {
      const response = await axios.post(
        'https://web.hi-dice.com/api/file/v1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.data.url;
    } catch (error) {
      console.error('Error uploading file:', error);
      return dog.profile;
    }
  };

  const { mutate: updateDog } = useMutate('/dog', '/dog', 'put');

  const handleSave = async () => {
    const formattedBirthDate = formatBirthDate(dogBirth);

    const imageUrl = await uploadImage();
    if (imageUrl) {
      const dogData = {
        dogId: dog.dogId,
        name: dogName,
        profile: imageUrl,
        birth: formattedBirthDate,
        isNeutered: isNeutered === 'yes',
      };

      updateDog(dogData, {
        onSuccess: () => {
          navigate('/');
        },
        onError: (error) => {
          alert('반려견 수정에 실패했습니다.');
        },
      });
    }
  };

  const { mutate: deleteDog } = useMutate(
    '/dog',
    `/dog/${dog.dogId}`,
    'delete'
  );
  const handleDelete = async () => {
    deleteDog(
      {},
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: (error) => {
          alert('반려견 삭제에 실패했습니다.');
        },
      }
    );
  };

  return (
    <FormContainer>
      <FormTopBox>
        <label htmlFor="dogImageUpload">
          <img
            className="img"
            src={dogImage}
            alt="반려견"
            width={101}
            height={101}
            style={{ cursor: 'pointer' }}
            onError={onErrorImg}
          />
        </label>
        <input
          id="dogImageUpload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <div className="topRight">
          <FormLabel>반려견 이름</FormLabel>
          <FormInput
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="반려견 이름을 등록해 주세요."
          />
        </div>
      </FormTopBox>
      <FormLabel>반려견 생일</FormLabel>
      <BirthSelectContainer>
        <SelectWrapper>
          <Select
            value={dogBirth.year}
            onChange={(e) => setDogBirth({ ...dogBirth, year: e.target.value })}
          >
            <option value="">연도</option>
            {generateYearOptions()}
          </Select>
        </SelectWrapper>
        <Span>년</Span>
        <SelectWrapper>
          <Select
            value={dogBirth.month}
            onChange={(e) =>
              setDogBirth({ ...dogBirth, month: e.target.value })
            }
          >
            <option value="">월</option>
            {generateMonthOptions()}
          </Select>
        </SelectWrapper>
        <Span>월</Span>
        <SelectWrapper>
          <Select
            value={dogBirth.day}
            onChange={(e) => setDogBirth({ ...dogBirth, day: e.target.value })}
          >
            <option value="">일</option>
            {generateDayOptions()}
          </Select>
        </SelectWrapper>
        <Span>일</Span>
      </BirthSelectContainer>
      <RadioWrapper>
        <FormLabel>중성화 여부</FormLabel>
        <RadioGroup>
          <RadioButton>
            <RadioInput
              type="button"
              $checked={isNeutered === 'yes'}
              onClick={() => setIsNeutered('yes')}
            >
              예
            </RadioInput>
          </RadioButton>
          <RadioButton>
            <RadioInput
              type="button"
              $checked={isNeutered === 'no'}
              onClick={() => setIsNeutered('no')}
            >
              아니요
            </RadioInput>
          </RadioButton>
        </RadioGroup>
      </RadioWrapper>

      <ButtonWrapper>
        <CancelButton onClick={handleDelete}>삭제</CancelButton>
        <AddButton onClick={handleSave}>수정완료</AddButton>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default EditDog;
