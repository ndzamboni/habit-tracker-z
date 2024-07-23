const { Pool } = require('pg');
const { databaseUrl, ssl } = require('./config');
require('dotenv').config();

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: ssl
});

module.exports = pool;
