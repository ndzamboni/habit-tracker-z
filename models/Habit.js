const pool = require('../config/database');

class Habit {
  static async create(userId, name, description, date) {
    const result = await pool.query(
      'INSERT INTO habits (user_id, name, description, created_at) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, name, description, date]
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
}

module.exports = Habit;
