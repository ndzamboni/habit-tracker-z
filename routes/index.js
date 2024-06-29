const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const habitsRoutes = require('./habits');

router.use('/auth', authRoutes);
router.use('/habits', habitsRoutes);

module.exports = router;
