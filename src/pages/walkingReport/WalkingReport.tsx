/* eslint-disable react/no-array-index-key */
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import AWS from 'aws-sdk';

import { v4 } from 'uuid';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  MemoBox,
} from '../../styles/walkingReportStyle/WalkingReportStyle';
import uploadDataState from '../../stores/uploadDataState';
import { formatDistance, formatTime } from '../../utils/formatTime';
import useMutate from '../../hooks/useMutate';
import selectedImageState from '../../stores/selectedImageState';

const WalkingReport = () => {
  const navigate = useNavigate();
  const [uploadData, setUploadData] = useRecoilState(uploadDataState);
  const [selectedImage, setSelectedImage] = useRecoilState(selectedImageState);
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
    console.log('uploadData:', uploadData);
    try {
      // const s3 = new AWS.S3({
      //   accessKeyId: process.env.REACT_APP_MINIO_ACCESS_KEY,
      //   secretAccessKey: process.env.REACT_APP_MINIO_SECRET_KEY,
      //   endpoint: process.env.REACT_APP_MINIO_ENDPOINT,
      //   s3ForcePathStyle: true,
      //   signatureVersion: 'v4',
      // });

      const uploadedPhotoUrls: string[] = [];

      // for (let i = 0; i < uploadData.walkingPhotos.length; i++) {
      //   const file = uploadData.walkingPhotos[i];

      //   const params = {
      //     Bucket: process.env.REACT_APP_MINIO_BUCKET_NAME || '',
      //     Key: file.name,
      //     Body: file,
      //   };

      //   try {
      //     const uploadResult = await s3.upload(params).promise();
      //     uploadedPhotoUrls.push(uploadResult.Location);
      //   } catch (uploadError) {
      //     console.error(`Error uploading file ${file.name}:`, uploadError);
      //   }
      // }

      for (let i = 0; i < uploadData.walkingPhotos.length; i++) {
        const file = uploadData.walkingPhotos[i];

        const formData = new FormData();
        formData.append('file', file);

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

          if (response.data && response.data.data.url) {
            uploadedPhotoUrls.push(response.data.data.url);
          } else {
            // console.error(
            //   `Error uploading file ${file.name}: No URL in response`
            // );
          }
        } catch (uploadError) {
          // console.error(`Error uploading file ${file.name}:`, uploadError);
        }
      }
      // console.log('uploadedPhotoUrls:', uploadedPhotoUrls);
      for (let i = 0; i < uploadedPhotoUrls.length; i++) {
        await uploadPicture(
          {
            walkingTrailUid: uploadData.walkingTrailUid,
            path: uploadedPhotoUrls[i],
            lat: uploadData.walkingCoordinates[0].lat,
            lng: uploadData.walkingCoordinates[0].lng,
          },

          {
            onError: (error) => {
              // console.error('Error sending photo URL to backend:', error);
            },
          }
        );
      }
      // console.log('uploadedPhotoUrls:', uploadedPhotoUrls);
      const dataToSend = {
        walkingTrailUid: uploadData.walkingTrailUid,
        name,
        time: Number(time),
        distance: Number(distance),
        description: memo,
        mainImage: uploadedPhotoUrls.length > 0 ? uploadedPhotoUrls[0] : '',
        openRange:
          activeButton === '전체공개'
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
          // onError: (error) => {
          //   console.error('Error registering walking trail:', error);
          // },
        }
      );
    } catch (err) {
      // console.error('Error uploading photo or sending data:', err);
    }
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true, // 드래그 가능
    infinite: false,
  };

  return (
    <BaseBox>
      <WalkingReportHeader />
      {selectedImage.length === 0 ? (
        <img
          src={WalkingReportThumbnail}
          alt="thumbnail"
          width={376}
          height={281}
        />
      ) : (
        <img src={selectedImage[0]} alt="thumbnail" width={376} height={281} />
      )}

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
                {selectedImage.map((photo: any, index: number) => (
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
          <MemoBox>
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
          </MemoBox>
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
