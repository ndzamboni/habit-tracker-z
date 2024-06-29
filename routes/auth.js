const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && await bcrypt.compare(password, user.password_hash)) {
    req.session.userId = user.id;
    res.redirect('/habits');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(username, hashedPassword);
  req.session.userId = user.id;
  res.redirect('/habits');
});

module.exports = router;
