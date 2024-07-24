/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react';
import styled from 'styled-components';

import { CalendarContext } from './useCalendarContext.ts';
import CalendarHeader from './CalendarHeader.tsx';
import CalendarBody from './CalendarBody.tsx';
import useCalendar from '../hooks/useCalendar.tsx';
import SelectedDate from './SelectedDate.tsx';

function CalendarRoot({ children }: { children: ReactNode }) {
    const calendar = useCalendar();
    return (
        <CalendarContext.Provider value={calendar}>
            <Container>{children}</Container>
        </CalendarContext.Provider>
    );
}

const Calendar = Object.assign(CalendarRoot, {
    Header: CalendarHeader,
    Body: CalendarBody,
    Footer: SelectedDate,
});

export default Calendar;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;
