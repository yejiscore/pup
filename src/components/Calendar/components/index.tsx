/* eslint-disable no-use-before-define */
/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react';
import styled from 'styled-components';

import CalendarHeader from './CalendarHeader';
import CalendarBody from './CalendarBody';
import useCalendar from '../hooks/useCalendar';
import { CalendarContext } from './CalendarProvider';

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
});

export default Calendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
