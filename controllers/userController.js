const Habit = require('../models/Habit');
const Category = require('../models/Category');

exports.showProfile = async (req, res) => {
  const userId = req.session.userId;
  try {
    const habits = await Habit.findByUserId(userId);
    const categories = await Category.findByUserId(userId);
    res.render('profile', { habits, categories });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    res.status(500).send('Error fetching profile data');
  }
};
