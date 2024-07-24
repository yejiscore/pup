/* eslint-disable react/prop-types */
// src/components/calendar/CalendarProvider.tsx
import React, { createContext, useContext } from 'react';
import useCalendar from '../hooks/useCalendar.tsx';

const CalendarContext = createContext(null);

export function CalendarProvider({ children }) {
    const calendar = useCalendar();
    return (
        <CalendarContext.Provider value={calendar}>
            {children}
        </CalendarContext.Provider>
    );
}

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw new Error(
            'useCalendarContext must be used within a CalendarProvider'
        );
    }
    return context;
};
