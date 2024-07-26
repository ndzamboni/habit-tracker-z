const express = require('express');
const categoryController = require('../controllers/categoryController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', categoryController.showCategories); // For rendering the view
router.get('/api', categoryController.getCategories); // For returning JSON
router.post('/add', categoryController.addCategory);
router.post('/delete/:id', categoryController.deleteCategory);

module.exports = router;
