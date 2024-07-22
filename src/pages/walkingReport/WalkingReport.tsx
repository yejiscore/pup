/* eslint-disable no-nested-ternary */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import AWS from 'aws-sdk';

import { v4 } from 'uuid';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import BaseBox from '../../styles/common/BaseBox';
import WalkingReportHeader from '../../components/walkingReport/WalkingReportHeader';
import WalkingReportThumbnail from '../../assets/walkingReport/walkingReportThumbnail.png';
import pen from '../../assets/walkingReport/pen.png';
import rediocheck from '../../assets/walkingReport/radiocheck.svg';
import noBackPen from '../../assets/walkingReport/noBackPen.png';
import {
  MiddlewBox,
  ComBoxOne,
  ComBoxTwo,
  BtnImage,
  Head4,
  Input,
  Body3,
  TimeDistance,
  BottomBox,
  ButtonWrapper,
  ToggleButtonGroup,
  ToggleButton,
  RegisterButton,
  CharCount,
  ImageContainer,
  ImageWrapper,
  ImageBox,
  DeleteButton,
  ButtonMemo,
  MemoTextArea,
  Text,
  MarginBox,
  ButtonTitleHead4,
} from '../../styles/walkingReportStyle/WalkingReportStyle';
import uploadDataState from '../../stores/uploadDataState';
import { formatDistance, formatTime } from '../../utils/formatTime';
import useMutate from '../../hooks/useMutate';

const WalkingReport = () => {
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useRecoilState(uploadDataState);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('작성해 주세요');
  const [time, setTime] = useState(uploadData.walkingTime || 11);
  const [distance, setDistance] = useState(
    uploadData.walkingDistance || 0.17674250992976798
  );
  const [activeButton, setActiveButton] = useState('비공개');
  const [memo, setMemo] = useState('');
  const [isMomo, setIsMemo] = useState(false);

  const formattedTime = formatTime(Number(time));
  const formattedDistance = formatDistance(Number(distance));

  const handleNameClick = () => {
    setName('');
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

  const { mutate: putWalkingTrail } = useMutate(
    'putWalkingTrail',
    '/walking-trail',
    'put'
  );
  const { mutate: uploadPicture } = useMutate(
    'uploadPicture',
    '/walking-trail/image',
    'post'
  );

  const handleRegister = async () => {
    try {
      const s3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
        secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
        endpoint: process.env.REACT_APP_MINIO_ENDPOINT,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
      });

      const uploadedPhotoUrls: string[] = [];

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

        const uploadResult = await s3.upload(params).promise();
        uploadedPhotoUrls.push(uploadResult.Location);
      }

      for (let i = 0; i < uploadedPhotoUrls.length; i++) {
        await uploadPicture(
          {
            walkingTrailUid: uploadData.walkingTrailId,
            path: uploadedPhotoUrls[i],
            lat: uploadData.walkingCoordinates[0].lat,
            lng: uploadData.walkingCoordinates[0].lng,
          },

          {
            onError: (error) => {
              console.error('Error sending photo URL to backend:', error);
            },
          }
        );
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

      putWalkingTrail(
        { ...dataToSend },
        {
          onSuccess: () => {
            navigate('/');
          },
          onError: (error) => {
            console.error('Error registering walking trail:', error);
          },
        }
      );
    } catch (err) {
      console.error('Error uploading photo or sending data:', err);
    }
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: uploadData.walkingPhotos.length,
    slidesToScroll: 1,
    infinite: false,
  };

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
          <div className="firstBox">
            <Head4>이름</Head4>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              placeholder="예: 즐거운 산책로"
              disabled={!isEditing}
              $isEditing={isEditing}
              maxLength={13}
            />

            {isEditing ? (
              <CharCount>{`${name.length}/13`}</CharCount>
            ) : (
              <BtnImage type="button" onClick={handleNameClick}>
                <img src={pen} alt="pen" width={28} height={28} />
              </BtnImage>
            )}
          </div>
        </ComBoxOne>

        <ComBoxOne>
          <TimeDistance>
            <Head4>시간</Head4>
            <Body3>{formattedTime}</Body3>
          </TimeDistance>
          <TimeDistance>
            <Head4>거리</Head4>
            <Body3>{formattedDistance}</Body3>
          </TimeDistance>
        </ComBoxOne>

        <ComBoxTwo>
          <MarginBox>
            <div className="title">
              <Head4>기록</Head4>
              <BtnImage type="button" onClick={handleNameClick}>
                <img src={pen} alt="pen" width={28} height={28} />
              </BtnImage>
            </div>
            <ImageContainer>
              <Slider {...settings}>
                {uploadData.walkingPhotos.map((photo: any, index: number) => (
                  <ImageWrapper key={index}>
                    <ImageBox src={photo} alt={`Walking Photo ${index + 1}`} />
                    <DeleteButton onClick={() => handleDeletePhoto(index)}>
                      <img src={rediocheck} alt="delete" />
                    </DeleteButton>
                  </ImageWrapper>
                ))}
              </Slider>
            </ImageContainer>
          </MarginBox>
        </ComBoxTwo>

        <ComBoxTwo style={{ marginTop: '20px' }}>
          <MarginBox>
            <div className="title">
              <Head4>메모</Head4>
            </div>

            {isMomo ? (
              <MemoTextArea
                placeholder="메모를 작성해주세요"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                disabled={!isMomo}
                maxLength={500}
              />
            ) : (
              <ButtonMemo onClick={onChangeIsMemo}>
                <img src={noBackPen} alt="pen" width={30} height={30} />
                <Text>메모 작성하기</Text>
              </ButtonMemo>
            )}
          </MarginBox>
        </ComBoxTwo>
      </MiddlewBox>

      <BottomBox>
        <ComBoxTwo>
          <MarginBox>
            <div className="title">
              <ButtonTitleHead4>공개범위</ButtonTitleHead4>
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
          </MarginBox>
        </ComBoxTwo>
      </BottomBox>
    </BaseBox>
  );
};

export default WalkingReport;
