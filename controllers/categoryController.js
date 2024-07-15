const Category = require('../models/Category');

exports.showCategories = async (req, res) => {
  const userId = req.session.userId;
  try {
    const categories = await Category.findByUserId(userId);
    res.render('categories', { categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Error fetching categories');
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
    res.status(500).send('Error adding category');
  }
};