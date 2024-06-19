// src/controllers/habitController.js
const { Habit, HabitEntry } = require('../models');

const createHabit = async (req, res) => {
  const { name, userId } = req.body;
  try {
    const habit = await Habit.create({ name, userId });
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHabits = async (req, res) => {
  const { userId } = req.params;
  try {
    const habits = await Habit.findAll({ where: { userId } });
    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const trackHabit = async (req, res) => {
  const { date, habitId } = req.body;
  try {
    const habitEntry = await HabitEntry.create({ date, habitId });
    res.status(201).json(habitEntry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHabitEntries = async (req, res) => {
  const { habitId } = req.params;
  try {
    const habitEntries = await HabitEntry.findAll({ where: { habitId } });
    res.status(200).json(habitEntries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createHabit, getHabits, trackHabit, getHabitEntries };
