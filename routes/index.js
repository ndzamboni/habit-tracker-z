const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const habitRoutes = require('./habitRoutes');
const categoryRoutes = require('./categoryRoutes');

router.use('/auth', authRoutes);
router.use('/habits', habitRoutes);
router.use('/categories', categoryRoutes);

router.get('/', (req, res) => res.redirect('/auth/login'));

module.exports = router;
