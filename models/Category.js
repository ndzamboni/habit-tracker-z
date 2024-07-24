const pool = require('../config/database');

class Category {
  static async create(name, userId) {
    const result = await pool.query(
      'INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING *',
      [name, userId]
    );
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM categories WHERE user_id = $1',
      [userId]
    );
    return result.rows;
  }

  static async delete(id) {
    await pool.query('DELETE FROM categories WHERE id = $1', [id]);
}

}



module.exports = Category;
