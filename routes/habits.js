const express = require('express');
const Habit = require('../models/Habit');
const router = express.Router();

router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
});

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  const habits = await Habit.findByUserId(userId);
  res.render('habits', { habits });
});

router.post('/add', async (req, res) => {
  const { habitName, habitDescription, habitDate } = req.body;
  const userId = req.session.userId;
  try {
    await Habit.create(userId, habitName, habitDescription, habitDate);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).send('Error adding habit');
  }
});

router.get('/add', (req, res) => {
  res.render('addHabit');
});

router.get('/data', async (req, res) => {
  const userId = req.session.userId;
  const habits = await Habit.findByUserId(userId);
  const habitCountByDate = habits.reduce((acc, habit) => {
    const date = habit.created_at.toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  res.json(habitCountByDate);
});

module.exports = router;
