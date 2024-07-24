const express = require('express');
const habitController = require('../controllers/habitController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(ensureAuthenticated);

router.get('/', habitController.showHabits);
router.get('/add', habitController.showAddHabit);
router.post('/add', habitController.addHabit);
router.get('/data', habitController.getHabitData);
router.get('/data/calendar', habitController.getHabitDataForCalendar);  // Add this line
router.get('/data/:categoryId', habitController.getHabitDataByCategory);
router.post('/delete/:id', habitController.deleteHabit);

module.exports = router;
