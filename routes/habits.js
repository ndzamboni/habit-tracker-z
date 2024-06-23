const express = require('express');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Middleware to check if user is logged in
function requireLogin(req, res, next) {
  if (!req.session.userId) {
    res.redirect('/auth/login');
  } else {
    next();
  }
}

// Get habits
router.get('/', requireLogin, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM habits WHERE user_id = $1', [req.session.userId]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send('Error fetching habits');
  }
});

// Add habit
router.post('/add', requireLogin, async (req, res) => {
  const { title } = req.body;
  try {
    await pool.query('INSERT INTO habits (user_id, title) VALUES ($1, $2)', [req.session.userId, title]);
    res.redirect('/habits');
  } catch (error) {
    res.status(500).send('Error adding habit');
  }
});

module.exports = router;
