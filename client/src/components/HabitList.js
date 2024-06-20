import React, { useEffect, useState } from 'react';
import { getHabit } from '../api/api';

const HabitList = ({ habitId }) => {
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    const fetchHabit = async () => {
      const response = await getHabit(habitId);
      setHabit(response.data);
    };

    fetchHabit();
  }, [habitId]);

  return (
    <div>
      {habit ? (
        <div>
          <h2>{habit.name}</h2>
          <p>User ID: {habit.userId}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HabitList;
