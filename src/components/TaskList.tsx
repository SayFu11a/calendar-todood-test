
import React from 'react';
import { useTasks } from '../hooks/useTasks';
import Task from './Task';

interface TaskListProps {
  date: string;
}

const TaskList: React.FC<TaskListProps> = ({ date }) => {
  const { tasks } = useTasks();

  return (
    <div>
      {tasks[date]?.map(task => (
        <Task key={task.id} date={date} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
