// src/components/Header.tsx
import React from 'react';

interface HeaderProps {
  month: number;
  year: number;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

const Header: React.FC<HeaderProps> = ({ month, year, onMonthChange, onYearChange }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onMonthChange(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onYearChange(parseInt(e.target.value));
  };

  return (
    <div className="header">
      <button onClick={() => onMonthChange(month - 1)} disabled={month === 0}>&lt;</button>
      <select value={month} onChange={handleMonthChange}>
        {months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>
      <input type="number" value={year} onChange={handleYearChange} />
      <button onClick={() => onMonthChange(month + 1)} disabled={month === 11}>&gt;</button>
    </div>
  );
};

export default Header;
