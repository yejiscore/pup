/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import AWS from 'aws-sdk';

import { v4 } from 'uuid';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportHeader from '../../components/walkingReport/WalkingReportHeader';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import rediocheck from '../../assets/walkingReport/radiocheck.svg';
import pen from '../../assets/walkingReport/pen.png';
import { BaseBody4, BaseHead4 } from '../../styles/common/textStyle';
import uploadDataState from '../../stores/uploadDataState';

const MiddlewBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 446px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

const ComBoxOne = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-left: 20px;
`;

const ComBoxTwo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  margin-left: 20px;

  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
  }
`;

const BtnImage = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Head4 = styled(BaseHead4)`
  color: ${(props) => props.theme.colors.primary[5]};
  font-weight: 400;
  line-height: 26.25px;
`;

const Input = styled.input`
  border: none;
  font-size: 22px;
  line-height: 26.25px;
  font-weight: 600;
  margin-left: 12px;
`;

const Body3 = styled(BaseBody4)`
  color: ${(props) => props.theme.colors.darkGray};
  font-weight: 600;
  line-height: 26.25px;
  margin-left: 12px;
`;

const TimeDistance = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  /* margin-left: 20px; */
`;

const ButtonMemo = styled.button`
  width: 336px;
  height: 44px;
  border-radius: 100px;
  border: 2px solid ${(props) => props.theme.colors.darkGray};
  background-color: inherit;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
`;

const Text = styled.span`
  font-size: 22px;
  font-weight: 400;
  color: ${(props) => props.theme.colors.darkGray};
  margin-left: 11px;
  line-height: 26.25px;
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  margin-top: 10px;
  height: 214px;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-right: 40px;
  margin-top: 12px;
  margin-bottom: 20px;
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 336px;
  height: 42px;
  border-radius: 25px;
  border: 2px solid ${(props) => props.theme.colors.primary[5]};
  overflow: hidden;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary[5] : props.theme.colors.white};
  color: ${(props) =>
    props.$active ? props.theme.colors.white : props.theme.colors.primary[5]};
  border: none;
  outline: none;
  cursor: pointer;
  width: 110px;
  height: 42px;
  border: 2px;

  &:not(:last-child) {
    border-right: 2px solid ${(props) => props.theme.colors.primary[5]};
  }
`;

const RegisterButton = styled.button`
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
  margin-right: 40px;
`;

const MemoTextArea = styled.textarea`
  width: 326px;
  max-height: 729px;
  min-height: 200px;
  border-radius: 18px;
  background-color: ${(props) => props.theme.colors.background};
  margin-top: 12px;
  margin-right: 20px;
  padding: 5px 10px;
  border: none;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ImageBox = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
`;
const DeleteButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const WalkingReport = () => {
  const [uploadData, setUploadData] = useRecoilState(uploadDataState);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState(uploadData.walkingTime);
  const [distance, setDistance] = useState(uploadData.walkingDistance);
  const [activeButton, setActiveButton] = useState('비공개');
  const [memo, setMemo] = useState('');
  const [isMomo, setIsMemo] = useState(false);
  console.log(uploadData);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleNameBlur = () => {
    setIsEditing(false);
  };
  const onChangeIsMemo = () => {
    setIsMemo((prev) => !prev);
  };

  const handleDeletePhoto = (index: number) => {
    setUploadData((prevData) => ({
      ...prevData,
      walkingPhotos: prevData.walkingPhotos.filter(
        (_: any, i: number) => i !== index
      ),
    }));
  };

  const handleRegister = async () => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
        endpoint: process.env.REACT_APP_MINIO_ENDPOINT,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });

      for (let i = 0; i < uploadData.walkingPhotos.length; i++) {
        const photo = uploadData.walkingPhotos[i];
        const base64Data = photo.split(',')[1];
        const binaryData = atob(base64Data);
        const bufferData = new Uint8Array(binaryData.length);

        for (let j = 0; j < binaryData.length; j++) {
          bufferData[j] = binaryData.charCodeAt(j);
        }

        const params = {
          Bucket: process.env.REACT_APP_MINIO_BUCKET_NAME || '',
          Key: `photos/${v4()}_${Date.now()}.jpg`,
          Body: bufferData,
          ContentEncoding: 'base64',
          ContentType: 'image/jpeg',
        };

        await s3.upload(params).promise();
      }

      // Add logic to send other data to the backend
      const dataToSend = {
        walkingTrailUid: uploadData.walkingTrailId,
        name,
        time,
        distance,
        description: memo,
        openRange:
          activeButton === '공개'
            ? 'PUBLIC'
            : activeButton === '친구만'
              ? 'PROTECTED'
              : 'PRIVATE',
        placeList: uploadData.walkingCoordinates,
      };

      console.log('Data to send:', dataToSend);
      // await axios.post('/your-backend-endpoint', dataToSend);

      console.log('All data successfully sent!');
    } catch (err) {
      console.error('Error uploading photo or sending data:', err);
    }
  };

  // const handleRegister = async () => {
  //   const payload = {
  //     walkingTrailUid: '11',
  //     name,
  //     time,
  //     distance,
  //     description: memo,
  //     openRange: activeButton, // 공개범위
  //     placeList: uploadData.walkingCoordinates,
  //   };
  //   console.log('Register payload:', payload);
  // };

  return (
    <BaseBox>
      <WalkingReportHeader />
      <img
        src={WalkingReportThumbnail}
        alt="thumbnail"
        width={376}
        height={281}
      />

      <MiddlewBox>
        <ComBoxOne>
          <Head4>이름</Head4>
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            placeholder="이름을 적어주세요"
            disabled={!isEditing}
          />
          <BtnImage type="button" onClick={handleNameClick}>
            <img src={pen} alt="pen" width={28} height={28} />
          </BtnImage>
        </ComBoxOne>
        <ComBoxOne>
          <TimeDistance>
            <Head4>시간</Head4>
            <Body3>{time}</Body3>
          </TimeDistance>
          <TimeDistance>
            <Head4>거리</Head4>
            <Body3>{distance}</Body3>
          </TimeDistance>
        </ComBoxOne>
        <ComBoxTwo>
          <div className="title">
            <Head4>기록</Head4>
            <BtnImage type="button" onClick={handleNameClick}>
              <img src={pen} alt="pen" width={28} height={28} />
            </BtnImage>
          </div>
          <ImageContainer>
            {uploadData.walkingPhotos.map((photo: any, index: number) => (
              <ImageWrapper key={index}>
                <ImageBox src={photo} alt={`Walking Photo ${index + 1}`} />
                <DeleteButton onClick={() => handleDeletePhoto(index)}>
                  <img src={rediocheck} alt="delete" />
                </DeleteButton>
              </ImageWrapper>
            ))}
          </ImageContainer>
        </ComBoxTwo>

        <ComBoxTwo>
          <div className="title">
            <Head4>메모</Head4>
          </div>
          <ButtonMemo onClick={onChangeIsMemo}>
            <img src={pen} alt="pen" width={30} height={30} />
            <Text>메모 작성하기</Text>
          </ButtonMemo>
          {isMomo && (
            <MemoTextArea
              placeholder="메모를 작성해주세요"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              disabled={!isMomo}
              maxLength={500}
            />
          )}
        </ComBoxTwo>
      </MiddlewBox>

      <BottomBox>
        <ComBoxTwo>
          <div className="title">
            <Head4>공개범위</Head4>
          </div>
          <ButtonWrapper>
            <ToggleButtonGroup>
              <ToggleButton
                $active={activeButton === '비공개'}
                onClick={() => setActiveButton('비공개')}
              >
                비공개
              </ToggleButton>
              <ToggleButton
                $active={activeButton === '친구만'}
                onClick={() => setActiveButton('친구만')}
              >
                친구만
              </ToggleButton>
              <ToggleButton
                $active={activeButton === '전체공개'}
                onClick={() => setActiveButton('전체공개')}
              >
                전체공개
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonWrapper>
          <RegisterButton onClick={handleRegister}>
            산책 등록하기
          </RegisterButton>
        </ComBoxTwo>
      </BottomBox>
    </BaseBox>
  );
};

export default WalkingReport;
