const express = require('express');
const path = require('path');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Middleware to check if user is authenticated
router.use((req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
});

// Habits page route
router.get('/', async (req, res) => {
  const userId = req.session.userId;
  try {
    const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [userId]);
    const habits = result.rows;
    res.sendFile(path.join(__dirname, '../views/habits.html')); // Render the habits page
  } catch (error) {
    console.error('Error retrieving habits:', error);
    res.status(500).send('Error retrieving habits');
  }
});

// Add habit form route
router.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/addHabit.html'));
});

// Handle add habit form submission
router.post('/add', async (req, res) => {
  const { habitName, habitDescription } = req.body;
  const userId = req.session.userId;
  try {
    await pool.query('INSERT INTO habits (user_id, name, description) VALUES ($1, $2, $3)', [userId, habitName, habitDescription]);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).send('Error adding habit');
  }
});

module.exports = router;
