const express = require('express');
const userController = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Ensure the middleware path is correct

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', userController.showProfile);

module.exports = router;
