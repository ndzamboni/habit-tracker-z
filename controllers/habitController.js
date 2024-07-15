const Habit = require('../models/Habit');

exports.showHabits = async (req, res) => {
  const userId = req.session.userId;
  try {
    const habits = await Habit.findByUserId(userId);
    res.render('habits', { habits });
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).send('Error fetching habits');
  }
};

exports.showAddHabit = (req, res) => {
  res.render('addHabit');
};

exports.addHabit = async (req, res) => {
  const { habitName, habitDescription, habitDate } = req.body;
  const userId = req.session.userId;
  try {
    await Habit.create(userId, habitName, habitDescription, habitDate);
    res.status(201).json({ message: 'Habit added successfully' });
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).json({ error: 'Error adding habit' });
  }
};

exports.getHabitData = async (req, res) => {
  const userId = req.session.userId;
  try {
    const habits = await Habit.findByUserId(userId);
    const habitCountByDate = habits.reduce((acc, habit) => {
      const date = habit.created_at.toISOString().split('T')[0];
      const timestamp = new Date(date).getTime() / 1000; // Convert to Unix timestamp
      acc[timestamp] = (acc[timestamp] || 0) + 1;
      return acc;
    }, {});
    res.json(habitCountByDate);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};
