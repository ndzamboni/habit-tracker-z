const express = require('express');
const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', categoryController.showCategories);
router.post('/add', categoryController.addCategory);

module.exports = router;
