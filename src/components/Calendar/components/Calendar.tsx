import React from 'react';
import Container from '../../common/Container';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import { CalendarProvider } from './CalendarProvider';

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
