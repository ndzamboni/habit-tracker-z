const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const habitRoutes = require('./habitRoutes');

router.use('/auth', authRoutes);
router.use('/habits', habitRoutes);

router.get('/', (req, res) => res.redirect('/auth/login'));

module.exports = router;
