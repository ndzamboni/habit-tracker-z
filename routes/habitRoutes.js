const express = require('express');
const habitController = require('../controllers/habitController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', habitController.showHabits);
router.get('/add', habitController.showAddHabit);
router.post('/add', habitController.addHabit);
router.get('/data', habitController.getHabitData);
router.get('/data/calendar', habitController.getHabitDataForCalendar);
router.get('/data/hexbin', habitController.getHexbinData);  // Added route for hexbin data
router.get('/data/treemap', habitController.getTreemapData);  // Added route for treemap data
router.get('/data/:categoryId', habitController.getHabitDataByCategory);
router.get('/list/:categoryId', habitController.getHabitsByCategory);
router.post('/delete/:id', habitController.deleteHabit);

module.exports = router;
