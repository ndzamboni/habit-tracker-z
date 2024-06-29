const express = require('express');
const Habit = require('../models/Habit');

const router = express.Router();

router.get('/', async (req, res) => {
  const userId = req.session.userId;
  const habits = await Habit.findByUserId(userId);
  res.render('habits', { habits });
});

router.post('/add', async (req, res) => {
  const { name, description, date } = req.body;
  const userId = req.session.userId;
  await Habit.create(userId, name, description, date);
  res.redirect('/habits');
});

module.exports
