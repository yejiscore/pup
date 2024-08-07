import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalendarContext } from './useCalendarContext';
import { useAppContext } from '../../../context/AppContext';
import WalkList from '../../MyWalkingBoard/WalkList';
import { DataItem } from '../../../types/DataItem';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarContainer = styled.div`
  width: 336px;
  display: grid;
  grid-template-columns: repeat(7, 48px);
  grid-auto-rows: 48px;
  align-items: center;
  justify-items: center;
  margin: 0 auto;
  margin-top: 20px;
`;

const Day = styled.div<{
  isCurrentMonth: string;
  hasData: string;
  isSelected: string;
}>`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 18px;
  position: relative;
  visibility: ${(props) =>
    props.isCurrentMonth === 'true' ? 'visible' : 'hidden'};
  cursor: ${(props) => (props.hasData === 'true' ? 'pointer' : 'default')};
  color: ${(props) => (props.hasData === 'true' ? 'white' : '#000')};
  background-color: ${(props) =>
    props.hasData === 'true' ? '#00ae80' : 'transparent'};
  border-radius: ${(props) => (props.hasData === 'true' ? '50%' : '0')};
  border: ${(props) =>
    props.isSelected === 'true' ? '2px solid #00684D' : 'none'};
`;

const Weekday = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  color: #00ae80;
`;

const WalkListContainer = styled.div`
  width: 100%;
  max-height: 400px;
  margin-top: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

function CalendarBody() {
  const { daysInMonth, currentDate } = useCalendarContext();
  const { myData } = useAppContext();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredDays = daysInMonth.map((day) => ({
    ...day,
    isCurrentMonth: day.month === currentDate.month,
    hasData: myData.some(
      (data: DataItem) =>
        new Date(data.createdDate).toLocaleDateString() ===
        day.date.replace(/-/g, '.')
    ),
    isSelected: selectedDate === day.date.replace(/-/g, '.'),
  }));

  const handleDayClick = (date: string) => {
    setSelectedDate(date.replace(/-/g, '.'));
  };

  const selectedDateData = selectedDate
    ? myData.filter(
        (data: DataItem) =>
          new Date(data.createdDate).toLocaleDateString() === selectedDate
      )
    : [];

  return (
    <Wrapper>
      <CalendarContainer>
        {weekdays.map((weekday) => (
          <Weekday key={weekday}>{weekday}</Weekday>
        ))}
        {filteredDays.map((day) => (
          <Day
            key={day.date}
            isCurrentMonth={day.isCurrentMonth ? 'true' : 'false'}
            hasData={day.hasData ? 'true' : 'false'}
            isSelected={day.isSelected ? 'true' : 'false'}
            onClick={() => day.hasData && handleDayClick(day.date)}
          >
            {day.day}
          </Day>
        ))}
      </CalendarContainer>
      {selectedDate && selectedDateData.length > 0 && (
        <WalkListContainer>
          <WalkList data={selectedDateData} activeSubTab="selectedDate" />
        </WalkListContainer>
      )}
    </Wrapper>
  );
}

export default CalendarBody;
