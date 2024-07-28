const express = require('express');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', userController.showProfile);

module.exports = router;
