// src/components/Task.tsx
import React from 'react';
import { useTasks } from '../hooks/useTasks';

interface TaskProps {
  date: string;
  task: { id: number; text: string; completed: boolean };
}

const Task: React.FC<TaskProps> = ({ date, task }) => {
  const { toggleTask, removeTask } = useTasks();

  return (
    <div className="task">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(date, task.id)}
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => removeTask(date, task.id)}>Delete</button>
    </div>
  );
};

export default Task;
