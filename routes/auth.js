const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');
const { Pool } = require('pg');

const router = express.Router();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Register page route
router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Register user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  console.log('Registering user:', username); // Log the username
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await pool.query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', [username, hashedPassword]);
    res.redirect('/auth/login');
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).send('Error registering user');
  }
});

// Login page route
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Logging in user:', username); // Log the username
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) {
      console.error('User not found'); // Log if user is not found
      return res.status(401).send('Invalid credentials');
    }
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (passwordMatch) {
      req.session.userId = user.id;
      console.log('Login successful'); // Log successful login
      res.redirect('/habits'); // Redirect to /habits after successful login
    } else {
      console.error('Invalid credentials'); // Log invalid credentials
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
