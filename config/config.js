require('dotenv').config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  sessionSecret: process.env.SESSION_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  ssl: { rejectUnauthorized: process.env.NODE_ENV === 'production' } // Only use SSL in production
};
