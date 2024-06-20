const { Habit } = require('../../models');

exports.createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);
    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getHabit = async (req, res) => {
  try {
    const habit = await Habit.findByPk(req.params.id);
    if (!habit) {
      res.status(404).json({ message: 'Habit not found' });
      return;
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
