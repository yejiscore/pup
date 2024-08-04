import React from 'react';
import Container from '../../common/Container';
import CalendarBody from './CalendarBody';
import CalendarHeader from './CalendarHeader';
import { CalendarProvider } from './CalendarProvider';
import useFetch from '../../../hooks/useFetch';

function Calendar() {
  const {
    data: myWalkingBoardData,
    error,
    isLoading,
  } = useFetch('myData', 'walking-trail', {});

  console.log(myWalkingBoardData);

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
