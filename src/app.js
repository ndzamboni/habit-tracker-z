const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

app.use(bodyParser.json());

// import routes

const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
app.use('/users', userRoutes);
app.use('/habits', habitRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Habit Z Tracker API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log('Server is running great on port ${PORT}');
    await sequelize.authenticate();
    console.log('Database connected!');
});

