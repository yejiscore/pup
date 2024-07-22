import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import { screen } from '@testing-library/react';
import dogPictureOn from '../../assets/map/dogPictureOn.png';
import dogPictureOff from '../../assets/map/dogPictureOff.png';
import useFetch from '../../hooks/useFetch';
import getUserDogsType from '../../types/getUserDogsType';

const ModalContainer = styled.div`
  width: 336px;
  height: 216px;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow:
    0px 3px 7px 0px #309c7133,
    0px 13px 13px 0px #309c712b,
    0px 30px 18px 0px #309c711a,
    0px 53px 21px 0px #309c7108,
    0px 82px 23px 0px #309c7100;
  position: absolute;
  bottom: 121px;
  border-radius: 18px;
`;

const TitleWrapper = styled.div`
  width: 100%;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;

  .title {
    font-weight: 600;
    font-size: 22px;
    line-height: 26.25px;
    letter-spacing: -1%;
    color: ${(props) => props.theme.colors.darkGray};
    text-align: center;
    margin-top: 21px;
  }
`;

const DogWapper = styled.div`
  width: 100%;
  height: 158px;
  overflow: hidden;

  .slick-slider {
    height: 100%;
  }

  .slick-list {
    height: 100%;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const DohImgWrapper = styled.div`
  margin-top: 21px;

  width: 85px;
  height: 109px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;

  .dogName {
    font-size: 17px;
    font-weight: 400;
    line-height: 23.63px;
    letter-spacing: -1%;
    text-align: center;
  }
`;

const DogSelectModal = ({
  isOpen,
  onClose,
  onDogSelect,
  selectedDogs,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDogSelect: (dogId: number) => void;
  selectedDogs: number[];
}) => {
  const { data: dogData, isLoading } = useFetch<getUserDogsType>(
    'dogs',
    '/dog',
    {}
  );
  // const dogData = {
  //   code: 200,
  //   status: 'OK',
  //   data: [
  //     {
  //       dogId: 1,
  //       name: '뽀삐',
  //       profile: 'https://',
  //       birth: '2021-01-01',
  //       isNeutered: false,
  //     },
  //     {
  //       dogId: 2,
  //       name: '뽀삐',
  //       profile: 'https://',
  //       birth: '2021-01-01',
  //       isNeutered: false,
  //     },
  //     {
  //       dogId: 3,
  //       name: '뽀삐',
  //       profile: 'https://',
  //       birth: '2021-01-01',
  //       isNeutered: false,
  //     },
  //     {
  //       dogId: 4,
  //       name: '뽀삐',
  //       profile: 'https://',
  //       birth: '2021-01-01',
  //       isNeutered: false,
  //     },
  //     {
  //       dogId: 5,
  //       name: '뽀삐',
  //       profile: 'https://',
  //       birth: '2021-01-01',
  //       isNeutered: false,
  //     },
  //   ],
  //   message: '강아지 리스트를 조회합니다.',
  // };
  // const isLoading = false;

  const handleDogClick = (dogId: number) => {
    onDogSelect(dogId);
  };

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: dogData ? Math.min(dogData.data.length, 3) : 1,
    slidesToScroll: 1,
    infinite: false,
  };

  if (!isOpen) return null;
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <TitleWrapper>
        <span className="title">함께할 반려견을 선택해 주세요.</span>
      </TitleWrapper>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <DogWapper>
          <Slider {...settings}>
            {dogData &&
              dogData.data.map((dog) => (
                <DohImgWrapper
                  key={dog.dogId}
                  onClick={() => handleDogClick(dog.dogId)}
                >
                  <img
                    src={
                      selectedDogs.includes(dog.dogId)
                        ? dogPictureOn
                        : dogPictureOff
                    }
                    alt={dog.name}
                    width={85}
                    height={85}
                  />
                  <p className="dogName">{dog.name}</p>
                </DohImgWrapper>
              ))}
          </Slider>
        </DogWapper>
      )}
    </ModalContainer>
  );
};

export default DogSelectModal;
