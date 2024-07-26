const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const habitRoutes = require('./habitRoutes');
const categoryRoutes = require('./categoryRoutes');
const profileRoutes = require('./profileRoutes'); // Ensure profile route is included

router.use('/auth', authRoutes);
router.use('/habits', habitRoutes);
router.use('/categories', categoryRoutes);
router.use('/profile', profileRoutes); // Add this line if it's missing

router.get('/', (req, res) => res.redirect('/auth/login'));

module.exports = router;
