const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const { ensureAuthenticated } = require('./middleware/authMiddleware');
const { databaseUrl, sessionSecret, nodeEnv, ssl } = require('./config/config');

// Configure Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: {
        formatDate: require('./helpers/dateHelpers').formatDate,
        ifCond: function (v1, v2, options) {
            if (v1 === v2) {
                return options.fn(this);
            }
            return options.inverse(this);
        }
    }
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public and node_modules
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/d3/dist')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: 'auto' }
}));

// Use central routes
const routes = require('./routes');
app.use(routes);

app.get('/', (req, res) => res.redirect('/auth/login'));

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
