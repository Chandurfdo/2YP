// user-service/db.js
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'organizer_dashboard',
  password: process.env.DB_PASSWORD || 'AFdo1208@sql',
  port: parseInt(process.env.DB_PORT) || 5432,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

module.exports = pool;