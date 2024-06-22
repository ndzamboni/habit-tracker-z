// routes/habits.js

const express = require('express');
const { Pool } = require('pg');
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new habit
router.post('/', async (req, res) => {
  const { title } = req.body;
  const userId = req.session.userId;
  try {
    const result = await pool.query(
      'INSERT INTO habits (user_id, title) VALUES ($1, $2) RETURNING id',
      [userId, title]
    );
    res.status(201).send({ habitId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating habit');
  }
});

// Get all habits for a user
router.get('/', async (req, res) => {
  const userId = req.session.userId;
  try {
    const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [userId]);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching habits');
  }
});

module.exports = router;
