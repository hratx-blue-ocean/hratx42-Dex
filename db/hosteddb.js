const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const pg = require('pg');
const pgClient = new pg.Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: 'dexdb'
});

pgClient.connect(err => {
  if (err) console.log('Could not connect to database:', err);
  else console.log('Connected to database!');
});

module.exports = pgClient;