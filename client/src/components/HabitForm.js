import React, { useState } from 'react';
import { createHabit } from '../api/api';

const HabitForm = () => {
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createHabit({ name, userId });
    setName('');
    setUserId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
