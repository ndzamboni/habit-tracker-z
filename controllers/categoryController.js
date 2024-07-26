const Category = require('../models/Category');
const Habit = require('../models/Habit');

exports.showCategories = async (req, res) => {
    const userId = req.session.userId;
    try {
        const categories = await Category.findByUserId(userId);
        res.json(categories); // Return the categories as JSON
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Error fetching categories' });
    }
};

exports.addCategory = async (req, res) => {
    const userId = req.session.userId;
    const { categoryName } = req.body;
    try {
        await Category.create(categoryName, userId);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Error adding category' });
    }
};

exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        await Habit.updateCategoryIdToNull(categoryId); // Ensure category ID is set to null before deleting
        await Category.delete(categoryId);
        res.redirect('/categories');
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Error deleting category' });
    }
};
