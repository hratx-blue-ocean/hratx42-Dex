const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const pg = require('pg');

dbConnectionSettings = {
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  database: 'dexdb',
}

const pgClient = new pg.Pool(dbConnectionSettings);
const notifClient = new pg.Client(dbConnectionSettings);

module.exports = {pgClient, notifClient};
