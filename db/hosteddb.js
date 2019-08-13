const pg = require('pg');
require('dotenv').config();
// console.log(require('dotenv').config());
const pgClient = new pg.Client({
    host: process.env.DB_HOST,
    port: 5432,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    database: 'dexdb'
});

pgClient.connect((err) => {
    if (err) console.log("Could not connect to database:", err);
    else console.log("Connected to database!");
});

const db = async (id) => {
    const product = await pgClient.query(
        `SELECT * FROM tables`
    );
    return product;
}

const getUserInfoByEmail = async (email) => {
    const userInfo = await pgClient.query(`SELECT * FROM Users where email=${email};`)
    return userInfo;
}

pgClient.query('INSERT INTO Users ')

module.exports = { db, getUserInfoByEmail };
