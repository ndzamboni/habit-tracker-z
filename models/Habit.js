const pool = require('../config/database');

class Habit {
    static async create(userId, name, description, date, categoryId, timeSpent) {
        const result = await pool.query(
          'INSERT INTO habits (user_id, name, description, created_at, category_id, time_spent) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [userId, name, description, date, categoryId, timeSpent]
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

    static async delete(id, userId) {
        await pool.query('DELETE FROM habits WHERE id = $1 AND user_id = $2', [id, userId]);
    }

    static async findByUserIdAndCategoryId(userId, categoryId) {
        const result = await pool.query(
            'SELECT * FROM habits WHERE user_id = $1 AND category_id = $2 ORDER BY created_at DESC',
            [userId, categoryId]
        );
        return result.rows;
    }

    static async updateCategoryIdToNull(categoryId) {
        await pool.query('UPDATE habits SET category_id = NULL WHERE category_id = $1', [categoryId]);
    }

    static async update(id, userId, name, description, date, categoryId, timeSpent) {
        await pool.query(
          'UPDATE habits SET name = $1, description = $2, created_at = $3, category_id = $4, time_spent = $5 WHERE id = $6 AND user_id = $7',
          [name, description, date, categoryId, timeSpent, id, userId]
        );
      }
    
}

module.exports = Habit;
