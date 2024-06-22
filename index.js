// index.js

const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Routes
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
