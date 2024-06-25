const express = require('express');
const session = require('express-session');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // Serve static files from the public directory

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

// Routes
const authRoutes = require('./routes/auth');
const habitRoutes = require('./routes/habits');

app.use('/auth', authRoutes);
app.use('/habits', habitRoutes);

// Default route to handle root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

// 404 error handling
app.use((req, res, next) => {
  res.status(404).send('Sorry, page not found');
});

// Server start
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
