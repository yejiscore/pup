// import {
//     addMonths,
//     eachDayOfInterval,
//     endOfMonth,
//     endOfWeek,
//     format,
//     getDay,
//     startOfMonth,
//     startOfWeek,
//     subMonths,
// } from 'date-fns';
// import { useState } from 'react';

// const useCalendar = () => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [currentYear, currentMonth, currentDay] = format(
//         currentDate,
//         'yyyy-MM-dd'
//     ).split('-');
//     const [selectedDate, setSelectedDate] = useState<string>(
//         format(new Date(), 'yyyy-MM-dd')
//     );

//     const startCurrentMonth = startOfMonth(currentDate);
//     const endCurrentMonth = endOfMonth(currentDate);
//     const startOfFirstWeek = startOfWeek(startCurrentMonth, {
//         weekStartsOn: 0,
//     });
//     const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

//     const days = eachDayOfInterval({
//         start: startOfFirstWeek,
//         end: endOfLastWeek,
//     });
//     const handlePrevMonth = () => {
//         setCurrentDate((prevDate) => subMonths(prevDate, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentDate((prevDate) => addMonths(prevDate, 1));
//     };

//     const handleSelectDate = (date: string) => {
//         setSelectedDate(date);
//     };
//     const daysInMonth = days.map((day) => ({
//         date: format(day, 'yyyy-MM-dd'),
//         year: format(day, 'yyyy'),
//         month: format(day, 'MM'),
//         day: format(day, 'dd'),
//         dayIndexOfWeek: getDay(day),
//     }));

//     return {
//         currentDate: {
//             year: currentYear,
//             month: currentMonth,
//             day: currentDay,
//         },
//         daysInMonth,
//         dispatch: {
//             handlePrevMonth,
//             handleNextMonth,
//         },
//         selectedDate: {
//             date: selectedDate,
//             selectDate: handleSelectDate,
//         },
//     };
// };
// export default useCalendar;

// import {
//     addMonths,
//     eachDayOfInterval,
//     endOfMonth,
//     endOfWeek,
//     format,
//     getDay,
//     startOfMonth,
//     startOfWeek,
//     subMonths,
// } from 'date-fns';
// import { useState } from 'react';

// interface Day {
//     date: string;
//     year: string;
//     month: string;
//     day: string;
//     dayIndexOfWeek: number;
// }

// interface CalendarContextType {
//     currentDate: {
//         year: string;
//         month: string;
//         day: string;
//     };
//     daysInMonth: Day[];
//     dispatch: {
//         handlePrevMonth: () => void;
//         handleNextMonth: () => void;
//     };
//     selectedDate: {
//         date: string;
//         selectDate: (date: string) => void;
//     };
// }

// const useCalendar = (): CalendarContextType => {
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [selectedDate, setSelectedDate] = useState<string>(
//         format(new Date(), 'yyyy-MM-dd')
//     );

//     const [currentYear, currentMonth, currentDay] = format(
//         currentDate,
//         'yyyy-MM-dd'
//     ).split('-');

//     const startCurrentMonth = startOfMonth(currentDate);
//     const endCurrentMonth = endOfMonth(currentDate);
//     const startOfFirstWeek = startOfWeek(startCurrentMonth, {
//         weekStartsOn: 0,
//     });
//     const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

//     const days = eachDayOfInterval({
//         start: startOfFirstWeek,
//         end: endOfLastWeek,
//     });

//     const handlePrevMonth = () => {
//         setCurrentDate((prevDate) => subMonths(prevDate, 1));
//     };

//     const handleNextMonth = () => {
//         setCurrentDate((prevDate) => addMonths(prevDate, 1));
//     };

//     const handleSelectDate = (date: string) => {
//         setSelectedDate(date);
//     };

//     const daysInMonth = days.map((day) => ({
//         date: format(day, 'yyyy-MM-dd'),
//         year: format(day, 'yyyy'),
//         month: format(day, 'MM'),
//         day: format(day, 'dd'),
//         dayIndexOfWeek: getDay(day),
//     }));

//     return {
//         currentDate: {
//             year: currentYear,
//             month: currentMonth,
//             day: currentDay,
//         },
//         daysInMonth,
//         dispatch: {
//             handlePrevMonth,
//             handleNextMonth,
//         },
//         selectedDate: {
//             date: selectedDate,
//             selectDate: handleSelectDate,
//         },
//     };
// };

// export default useCalendar;

// src/hooks/useCalendar.ts
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from 'date-fns';
import { useState } from 'react';

export interface Day {
  date: string;
  year: string;
  month: string;
  day: string;
  dayIndexOfWeek: number;
}

export interface CalendarContextType {
  currentDate: {
    year: string;
    month: string;
    day: string;
  };
  daysInMonth: Day[];
  dispatch: {
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
  };
  selectedDate: {
    date: string;
    selectDate: (date: string) => void;
  };
}

const useCalendar = (): CalendarContextType => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(
    format(new Date(), 'yyyy-MM-dd')
  );

  const [currentYear, currentMonth, currentDay] = format(
    currentDate,
    'yyyy-MM-dd'
  ).split('-');

  const startCurrentMonth = startOfMonth(currentDate);
  const endCurrentMonth = endOfMonth(currentDate);
  const startOfFirstWeek = startOfWeek(startCurrentMonth, {
    weekStartsOn: 0,
  });
  const endOfLastWeek = endOfWeek(endCurrentMonth, { weekStartsOn: 0 });

  const days = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const daysInMonth = days.map((day) => ({
    date: format(day, 'yyyy-MM-dd'),
    year: format(day, 'yyyy'),
    month: format(day, 'MM'),
    day: format(day, 'dd'),
    dayIndexOfWeek: getDay(day),
  }));

  return {
    currentDate: {
      year: currentYear,
      month: currentMonth,
      day: currentDay,
    },
    daysInMonth,
    dispatch: {
      handlePrevMonth,
      handleNextMonth,
    },
    selectedDate: {
      date: selectedDate,
      selectDate: handleSelectDate,
    },
  };
};

export default useCalendar;
