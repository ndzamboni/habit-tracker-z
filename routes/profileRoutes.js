const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.ensureAuthenticated);

router.get('/', userController.showProfile);

module.exports = router;
