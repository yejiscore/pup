// /* eslint-disable react/prop-types */
// // src/components/calendar/CalendarProvider.tsx
// import React, { createContext, useContext } from 'react';
// import useCalendar from '../hooks/useCalendar';

// const CalendarContext = createContext(null);

// export function CalendarProvider({ children }) {
//     const calendar = useCalendar();
//     return (
//         <CalendarContext.Provider value={calendar}>
//             {children}
//         </CalendarContext.Provider>
//     );
// }

// export const useCalendarContext = () => {
//     const context = useContext(CalendarContext);
//     if (!context) {
//         throw new Error(
//             'useCalendarContext must be used within a CalendarProvider'
//         );
//     }
//     return context;
// };

// // src/components/calendar/CalendarProvider.tsx
// import React, { createContext, useContext, ReactNode } from 'react';
// import useCalendar, { CalendarContextType } from '../hooks/useCalendar';

// export const CalendarContext = createContext<CalendarContextType | null>(null);

// interface CalendarProviderProps {
//     children: ReactNode;
// }

// export function CalendarProvider({ children }: CalendarProviderProps) {
//     const calendar = useCalendar();
//     return (
//         <CalendarContext.Provider value={calendar}>
//             {children}
//         </CalendarContext.Provider>
//     );
// }

// export function useCalendarContext() {
//     const context = useContext(CalendarContext);
//     if (!context) {
//         throw new Error(
//             'useCalendarContext must be used within CalendarProvider'
//         );
//     }
//     return context;
// }

// src/components/calendar/CalendarProvider.tsx
import React, { createContext, ReactNode } from 'react';
import useCalendar, { CalendarContextType } from '../hooks/useCalendar';

export const CalendarContext = createContext<CalendarContextType | null>(null);

interface CalendarProviderProps {
  children: ReactNode;
}

export function CalendarProvider({ children }: CalendarProviderProps) {
  const calendar = useCalendar();
  return (
    <CalendarContext.Provider value={calendar}>
      {children}
    </CalendarContext.Provider>
  );
}
