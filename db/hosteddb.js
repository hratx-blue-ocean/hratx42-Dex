const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
<<<<<<< HEAD
console.log(require('dotenv').config({ path: path.resolve(__dirname, '../.env') }))
=======
console.log(require('dotenv').config({ path: path.resolve(__dirname, '../.env') }));
console.log(process.env.DB_HOST, process.env.DB_USERNAME, process.env.DB_PASSWORD)
>>>>>>> ecf4a687b980f5232d9f09b2b2f3e89c0820b4c9
const pg = require('pg');

const pgClient = new pg.Pool({
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