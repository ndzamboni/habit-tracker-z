// src/routes/habitRoutes.js
const express = require('express');
const { createHabit, getHabits, trackHabit, getHabitEntries } = require('../controllers/habitController');
const router = express.Router();

router.post('/', createHabit);
router.get('/:userId', getHabits);
router.post('/track', trackHabit);
router.get('/entries/:habitId', getHabitEntries);

module.exports = router;
