const Habit = require('../models/Habit');
const Category = require('../models/Category');

exports.showHabits = async (req, res) => {
  const userId = req.session.userId;
  try {
    const habits = await Habit.findByUserId(userId);
    res.render('habits', { habits });
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).send('Error fetching habits');
  }
};

exports.showAddHabit = async (req, res) => {
  const userId = req.session.userId;
  try {
    const categories = await Category.findByUserId(userId);
    res.render('addHabit', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
  }
};

exports.addHabit = async (req, res) => {
  const { habitName, habitDescription, habitDate, categoryId } = req.body;
  const userId = req.session.userId;
  try {
    await Habit.create(userId, habitName, habitDescription, habitDate, categoryId);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error adding habit:', error);
    res.status(500).send('Error adding habit');
  }
};

exports.getHabitData = async (req, res) => {
  const userId = req.session.userId;
  try {
    const habits = await Habit.findByUserId(userId);
    const habitCountByDate = habits.reduce((acc, habit) => {
      const date = habit.created_at.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, habit: habit.name, value: 1 };
      } else {
        acc[date].value += 1;
      }
      return acc;
    }, {});
    res.json(Object.values(habitCountByDate));
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
};

exports.deleteHabit = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  try {
    await Habit.delete(id, userId);
    res.redirect('/habits');
  } catch (error) {
    console.error('Error deleting habit:', error);
    res.status(500).send('Error deleting habit');
  }
};

exports.getHabitDataByCategory = async (req, res) => {
  const userId = req.session.userId;
  const categoryId = req.params.categoryId;

  try {
      const habits = await Habit.findByUserIdAndCategoryId(userId, categoryId);
      const habitCountByDate = habits.reduce((acc, habit) => {
          const date = habit.created_at.toISOString().split('T')[0];
          const timestamp = new Date(date).getTime() / 1000; // Convert to Unix timestamp
          acc[timestamp] = (acc[timestamp] || 0) + 1;
          return acc;
      }, {});
      res.json(habitCountByDate);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
  }
};



