const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.post('/', habitController.createHabit);
router.get('/:id', habitController.getHabit);

module.exports = router;
