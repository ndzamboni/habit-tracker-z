const express = require('express');
const categoryController = require('../controllers/categoryController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.ensureAuthenticated);

router.get('/', categoryController.showCategories);
router.post('/add', categoryController.addCategory);

module.exports = router;
