const express = require('express');
const habitController = require('../controllers/habitController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware.ensureAuthenticated);

router.get('/', habitController.showHabits);
router.get('/add', habitController.showAddHabit);
router.post('/add', habitController.addHabit);
router.get('/data', habitController.getHabitData);
router.post('/delete/:id', habitController.deleteHabit);

module.exports = router;
