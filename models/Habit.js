const pool = require('../config/database');

class Habit {
  static async create(userId, name, description, date, categoryId) {
    const result = await pool.query(
      'INSERT INTO habits (user_id, name, description, created_at, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, name, description, date, categoryId]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM habits WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  static async findByCategory(userId, categoryId) {
    const result = await pool.query(
      'SELECT * FROM habits WHERE user_id = $1 AND category_id = $2 ORDER BY created_at DESC',
      [userId, categoryId]
    );
    return result.rows;
  }

  static async delete(id, userId) {
    const result = await pool.query(
      'DELETE FROM habits WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    return result.rows[0];
  }
}

module.exports = Habit;




module.exports = Habit;
