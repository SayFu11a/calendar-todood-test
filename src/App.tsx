import React from 'react';
import Calendar from './components/Calendar';
import { TaskProvider } from './contexts/TaskContext';
import { ProfileProvider } from './contexts/ProfileContext';
import ProfileSelector from './components/ProfileSelector';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <ProfileProvider>
      <TaskProvider>
        <div className="App">
          <h1>To-Do Calendar</h1>
          <ProfileSelector />
          <Calendar />
        </div>
      </TaskProvider>
    </ProfileProvider>
  );
};

export default App;
