// src/components/Day.tsx
import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { useTasks } from '../hooks/useTasks';
import Holidays from 'date-holidays';

interface DayProps {
  day: number;
  month: number;
  year: number;
}

const Day: React.FC<DayProps> = ({ day, month, year }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHoliday, setIsHoliday] = useState(false);
  const { tasks } = useTasks();
  const date = new Date(year, month, day).toISOString().split('T')[0];

  useEffect(() => {
    const hd = new Holidays('US'); // Вы можете указать код страны по своему желанию
    const holiday = hd.isHoliday(new Date(year, month, day));
    setIsHoliday(!!holiday);
  }, [day, month, year]);

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие события
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`day ${isHoliday ? 'holiday' : ''}`} onClick={openModal}>
      <div>{day}</div>
      <div>{tasks[date]?.length || 0} tasks</div>
      {isModalOpen && <Modal date={date} onClose={closeModal} />}
    </div>
  );
};

export default Day;
