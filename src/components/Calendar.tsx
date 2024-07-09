// src/components/Calendar.tsx
import React, { useState } from 'react';
import Day from './Day';
import Header from './Header';

const Calendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="calendar">
      <Header
        month={currentMonth}
        year={currentYear}
        onMonthChange={setCurrentMonth}
        onYearChange={setCurrentYear}
      />
      <div className="days">
        {days.map(day => (
          <Day key={day} day={day} month={currentMonth} year={currentYear} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
