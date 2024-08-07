/* eslint-disable import/prefer-default-export */
// /* eslint-disable no-unused-vars */
// import { createContext, useContext } from 'react';

// interface DateInfo {
//     year: string;
//     month: string;
//     day: string;
// }
// interface CalendarContextType {
//     currentDate: DateInfo;
//     daysInMonth: (DateInfo & { date: string; dayIndexOfWeek: number })[];
//     dispatch: {
//         handlePrevMonth: () => void;
//         handleNextMonth: () => void;
//     };
//     selectedDate: {
//         date: string;
//         selectDate: (date: string) => void;
//     };
// }

// export const CalendarContext = createContext<CalendarContextType | null>(null);

// export default function useCalendarContext() {
//     const context = useContext(CalendarContext);
//     if (!context) {
//         throw new Error(
//             'useCalendarContext must be used within CalendarProvider'
//         );
//     }
//     return context;
// }

// src/components/calendar/useCalendarContext.ts
import { useContext } from 'react';
import { CalendarContext } from './CalendarProvider';

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      'useCalendarContext must be used within a CalendarProvider'
    );
  }
  return context;
}
