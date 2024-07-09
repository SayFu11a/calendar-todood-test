// src/contexts/TaskContext.tsx
import React, { createContext, useState, ReactNode, useContext } from 'react';
import { useProfile } from './ProfileContext';

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
  const { currentProfile } = useProfile();
  const [tasks, setTasks] = useState<Record<number, Record<string, Task[]>>>({});

  const addTask = (date: string, text: string) => {
    if (!currentProfile) return;
    const profileTasks = tasks[currentProfile.id] || {};
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentProfile.id]: {
        ...profileTasks,
        [date]: [...(profileTasks[date] || []), newTask],
      },
    }));
  };

  const toggleTask = (date: string, taskId: number) => {
    if (!currentProfile) return;
    const profileTasks = tasks[currentProfile.id] || {};
    const updatedTasks = (profileTasks[date] || []).map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentProfile.id]: {
        ...profileTasks,
        [date]: updatedTasks,
      },
    }));
  };

  const removeTask = (date: string, taskId: number) => {
    if (!currentProfile) return;
    const profileTasks = tasks[currentProfile.id] || {};
    const updatedTasks = (profileTasks[date] || []).filter((task) => task.id !== taskId);
    setTasks((prevTasks) => ({
      ...prevTasks,
      [currentProfile.id]: {
        ...profileTasks,
        [date]: updatedTasks,
      },
    }));
  };

  const value = {
    tasks: tasks[currentProfile?.id || -1] || {},
    addTask,
    toggleTask,
    removeTask,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
