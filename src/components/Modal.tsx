
import React, { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskList from './TaskList';

interface ModalProps {
  date: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ date, onClose }) => {
  const [taskText, setTaskText] = useState('');
  const { addTask } = useTasks();

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(date, taskText);
      setTaskText('');
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Останавливаем всплытие события
  };

  return (
    <div className="modal" onClick={handleModalClick}>
      <button onClick={onClose}>Close</button>
      <h2>Tasks for {date}</h2>
      <TaskList date={date} />
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Modal;
