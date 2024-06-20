import React, { useState } from 'react';
import HabitList from './components/HabitList';
import HabitForm from './components/HabitForm';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App = () => {
  const [userId, setUserId] = useState(1); // Default user ID for demonstration
  const [habitId, setHabitId] = useState(1); // Default habit ID for demonstration

  return (
    <div>
      <h1>Habit Tracker</h1>
      <UserForm />
      <div>
        <label>
          User ID:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
          />
        </label>
      </div>
      <UserList userId={userId} />
      <HabitForm />
      <div>
        <label>
          Habit ID:
          <input
            type="number"
            value={habitId}
            onChange={(e) => setHabitId(Number(e.target.value))}
          />
        </label>
      </div>
      <HabitList habitId={habitId} />
    </div>
  );
};

export default App;
