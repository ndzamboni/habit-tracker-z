const Habit = require('../models/Habit');
const Category = require('../models/Category');

exports.showHabits = async (req, res) => {
    const userId = req.session.userId;
    try {
        const habits = await Habit.findByUserId(userId);
        const categories = await Category.findByUserId(userId);
        res.render('habits', { habits, categories });
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
    const { habitName, habitDescription, habitDate, categoryId, timeSpent } = req.body;
    const userId = req.session.userId;
    try {
        await Habit.create(userId, habitName, habitDescription, habitDate, categoryId, timeSpent);
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
        res.json(habits); // Return the habits as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

exports.getHabitDataForCalendar = async (req, res) => {
    const userId = req.session.userId;
    try {
        const habits = await Habit.findByUserId(userId);
        const habitCountByDate = habits.reduce((acc, habit) => {
            const date = habit.created_at.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        res.json(habitCountByDate); // Return the habit count by date as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

exports.getHabitDataByCategory = async (req, res) => {
    const userId = req.session.userId;
    const categoryId = req.params.categoryId;
    try {
        const habits = await Habit.findByUserIdAndCategoryId(userId, categoryId);
        const habitCountByDate = habits.reduce((acc, habit) => {
            const date = habit.created_at.toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
        }, {});
        res.json(habitCountByDate); // Return the habit count by date as JSON
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Error fetching data' });
    }
};

exports.getHabitsByCategory = async (req, res) => {
    const userId = req.session.userId;
    const categoryId = req.params.categoryId;
    try {
        const categories = await Category.findByUserId(userId);
        const habits = categoryId === 'all'
            ? await Habit.findByUserId(userId)
            : await Habit.findByUserIdAndCategoryId(userId, categoryId);
        res.json({ habits, categories }); // Return the habits and categories as JSON
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'Error fetching habits' });
    }
};

exports.getHabitDataForHexbin = async (req, res) => {
    const userId = req.session.userId;
    try {
        const habits = await Habit.findByUserId(userId);
        const hexbinData = habits.map(habit => [new Date(habit.created_at).getTime(), habit.time_spent]);
        res.json(hexbinData);
    } catch (error) {
        console.error('Error fetching hexbin data:', error);
        res.status(500).json({ error: 'Error fetching hexbin data' });
    }
};

exports.getHabitDataForTreemap = async (req, res) => {
    const userId = req.session.userId;
    try {
        const categories = await Category.findByUserId(userId);
        const habits = await Habit.findByUserId(userId);
        const treemapData = {
            name: 'Categories',
            children: categories.map(category => ({
                name: category.name,
                children: habits
                    .filter(habit => habit.category_id === category.id)
                    .map(habit => ({ name: habit.name, time_spent: habit.time_spent }))
            }))
        };
        res.json(treemapData);
    } catch (error) {
        console.error('Error fetching treemap data:', error);
        res.status(500).json({ error: 'Error fetching treemap data' });
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
