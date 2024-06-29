const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto' }
}));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Routes
const authRoutes = require('./routes/auth');
const habitsRoutes = require('./routes/habits');
app.use('/auth', authRoutes);
app.use('/habits', habitsRoutes);

app.get('/', (req, res) => res.redirect('/auth/login'));

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
