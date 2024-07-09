// src/App.tsx
import React from 'react';
import Calendar from './components/Calendar';
import { TaskProvider } from './contexts/TaskContext';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <TaskProvider>
      <div className="App">
        <h1>To-Do Calendar</h1>
        <Calendar />
      </div>
    </TaskProvider>
  );
};

export default App;
