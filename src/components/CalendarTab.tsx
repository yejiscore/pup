/* eslint-disable no-unused-vars */
import React from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  background-color: #ffffff;
  padding: 10px 0;
`;

const CalendarButton = styled.button<{ active: boolean }>`
  background-color: ${props => (props.active ? '#00AE80' : '#B7CAC4')};
  border: none;
  padding: 10px;
  cursor: pointer;
  flex: 1;
  font-size: 1em;
  color: ${props => (props.active ? '#fff' : '#000')};
`;

interface CalendarProps {
  activeCalendar: string;
  setActiveCalendar: (calendar: string) => void;
}

function Calendar({ activeCalendar, setActiveCalendar }: CalendarProps) {
  return (
    <CalendarContainer>
      <CalendarButton
        active={activeCalendar === 'Calendar'}
        onClick={() => setActiveCalendar('Calendar')}
      >
        Calendar
      </CalendarButton>
    </CalendarContainer>
  );
}

export default Calendar;