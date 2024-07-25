/* eslint-disable react/button-has-type */
// src/components/calendar/CalendarHeader.tsx
import React from 'react';
import styled from 'styled-components';
// import { CalendarContext } from './CalendarProvider';
import LeftArrowIcon from '../../../assets/Left.png';
import RightArrowIcon from '../../../assets/Right.png';
import { useCalendarContext } from './useCalendarContext';

const Container = styled.div`
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  box-sizing: border-box;
  top: 0;
`;

const ChangeButton = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowIcon = styled.img`
  cursor: pointer;
  position: absolute;
`;

const LeftArrow = styled(ArrowIcon)`
  left: 120px;
`;

const RightArrow = styled(ArrowIcon)`
  right: 120px;
`;

const DateText = styled.span`
  font-size: 20px;
  line-height: 25.6px;
`;

function CalendarHeader() {
  const { dispatch, currentDate } = useCalendarContext();

  return (
    <Container>
      <ChangeButton>
        <LeftArrow
          src={LeftArrowIcon}
          alt="Previous Month"
          onClick={dispatch.handlePrevMonth}
        />
        <DateText>
          {currentDate.year}.{currentDate.month}
        </DateText>
        <RightArrow
          src={RightArrowIcon}
          alt="Next Month"
          onClick={dispatch.handleNextMonth}
        />
      </ChangeButton>
    </Container>
  );
}

export default CalendarHeader;
