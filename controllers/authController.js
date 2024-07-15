const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user && await bcrypt.compare(password, user.password_hash)) {
    req.session.userId = user.id;
    res.redirect('/habits');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
};

exports.showRegister = (req, res) => {
  res.render('register');
};

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create(username, hashedPassword);
  req.session.userId = user.id;
  res.redirect('/habits');
};

exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/habits');
    }
    res.clearCookie('connect.sid');
    res.redirect('/auth/login');
  });
};
