// routes/auth.js

const express = require('express');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// User registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
      [username, hashedPassword]
    );
    res.status(201).send({ userId: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user');
  }
});

// User login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).send('Invalid password');
    }
    req.session.userId = user.id;
    res.send('Login successful');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
