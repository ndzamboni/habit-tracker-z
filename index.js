const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const config = require('./config/config');

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: path.join(__dirname, 'views', 'partials'),
    helpers: require('./helpers/dateHelpers')
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/cal-heatmap/dist')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session middleware
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true,
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
