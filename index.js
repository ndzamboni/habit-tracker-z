const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Load helpers
const dateHelpers = require('./helpers/dateHelpers');

// Configure Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        formatDate: dateHelpers.formatDate
    }
});

app.engine('hbs', hbs.engine);
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
const pool = require('./config/database');

// Use central routes
const routes = require('./routes');
app.use(routes);

app.get('/', (req, res) => res.redirect('/auth/login'));

// 404 error handling
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
