/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useCalendarContext } from './CalendarProvider.tsx';
import { useAppContext } from '../../../context/AppContext.tsx';
import WalkList from '../../MyWalkingBoard/WalkList.tsx';

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
    isCurrentMonth: boolean;
    hasData: boolean;
    isSelected: boolean;
}>`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    font-size: 18px;
    position: relative;
    visibility: ${(props) => (props.isCurrentMonth ? 'visible' : 'hidden')};
    cursor: ${(props) => (props.hasData ? 'pointer' : 'default')};
    color: ${(props) => (props.hasData ? 'white' : '#000')};
    background-color: ${(props) => (props.hasData ? '#00ae80' : 'transparent')};
    border-radius: ${(props) => (props.hasData ? '50%' : '0')};
    border: ${(props) => (props.isSelected ? '2px solid #00684D' : 'none')};
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
            (data) => data.date === day.date.replace(/-/g, '.')
        ),
        isSelected: selectedDate === day.date.replace(/-/g, '.'),
    }));

    const handleDayClick = (date: string) => {
        setSelectedDate(date.replace(/-/g, '.'));
    };

    const selectedDateData = selectedDate
        ? myData.filter((data) => data.date === selectedDate)
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
                        isCurrentMonth={day.isCurrentMonth}
                        hasData={day.hasData}
                        isSelected={day.isSelected}
                        onClick={() => day.hasData && handleDayClick(day.date)}
                    >
                        {day.day}
                    </Day>
                ))}
            </CalendarContainer>
            {selectedDate && selectedDateData.length > 0 && (
                <WalkListContainer>
                    <WalkList
                        data={selectedDateData}
                        activeSubTab="selectedDate"
                    />
                </WalkListContainer>
            )}
        </Wrapper>
    );
}

export default CalendarBody;
