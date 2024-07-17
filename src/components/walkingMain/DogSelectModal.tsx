import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

import dogPictureOn from '../../assets/map/dogPictureOn.png';
import dogPictureOff from '../../assets/map/dogPictureOff.png';

const ModalContainer = styled.div`
  width: 336px;
  background-color: ${(props) => props.theme.colors.background};
  box-shadow:
    0px 3px 7px 0px #309c7133,
    0px 13px 13px 0px #309c712b,
    0px 30px 18px 0px #309c711a,
    0px 53px 21px 0px #309c7108,
    0px 82px 23px 0px #309c7100;
  height: 216px;
  position: absolute;
  bottom: 121px;
  border-radius: 18px;
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: 336px;
  height: 58px;
  gap: 10px;
  border-radius: 18px 18px 0px 0px;
  opacity: 0px;
`;

const DohImgWrapper = styled.div`
  width: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  .dogName {
    text-align: center;
    margin-top: 12px;
  }
`;

const SliderContainer = styled(Slider)`
  .slick-list {
    overflow: hidden;
  }
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;

const DogSelectModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
  };
  console.log(isOpen);
  if (!isOpen) return null;
  return (
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <Title>함께할 반려견을 선택해 주세요.</Title>
      <SliderContainer {...settings}>
        <DohImgWrapper>
          <img src={dogPictureOn} alt="개이름" width={85} height={85} />
          <p className="dogName">개이름</p>
        </DohImgWrapper>
        <DohImgWrapper>
          <img src={dogPictureOn} alt="개이름" width={85} height={85} />
          <p className="dogName">개이름</p>
        </DohImgWrapper>
        <DohImgWrapper>
          <img src={dogPictureOff} alt="개이름" width={85} height={85} />
          <p className="dogName">개이름</p>
        </DohImgWrapper>
        <DohImgWrapper>
          <img src={dogPictureOff} alt="개이름" width={85} height={85} />
          <p className="dogName">개이름</p>
        </DohImgWrapper>
        <DohImgWrapper>
          <img src={dogPictureOff} alt="개이름" width={85} height={85} />
          <p className="dogName">개이름</p>
        </DohImgWrapper>
      </SliderContainer>
    </ModalContainer>
  );
};

export default DogSelectModal;
