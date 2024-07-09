
import React, { createContext, useState, ReactNode } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskContextType {
  tasks: Record<string, Task[]>;
  addTask: (date: string, text: string) => void;
  toggleTask: (date: string, taskId: number) => void;
  removeTask: (date: string, taskId: number) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});

  const addTask = (date: string, text: string) => {
    setTasks(prevTasks => {
      const newTask: Task = { id: Date.now(), text, completed: false };
      return { ...prevTasks, [date]: [...(prevTasks[date] || []), newTask] };
    });
  };

  const toggleTask = (date: string, taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = (prevTasks[date] || []).map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      return { ...prevTasks, [date]: updatedTasks };
    });
  };

  const removeTask = (date: string, taskId: number) => {
    setTasks(prevTasks => {
      const updatedTasks = (prevTasks[date] || []).filter(task => task.id !== taskId);
      return { ...prevTasks, [date]: updatedTasks };
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
