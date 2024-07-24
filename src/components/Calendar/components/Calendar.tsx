import React from 'react';
import Container from '../../common/Container.tsx';
import CalendarBody from './CalendarBody.tsx';
import CalendarHeader from './CalendarHeader.tsx';
import { CalendarProvider } from './CalendarProvider.tsx';

function Calendar() {
  return (
    <Container>
      <CalendarProvider>
        <CalendarHeader />
        <CalendarBody />
      </CalendarProvider>
    </Container>
  );
}

export default Calendar;
