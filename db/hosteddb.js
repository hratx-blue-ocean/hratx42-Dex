const path = require('path')
require('dotenv').config({path: path.resolve(__dirname, '../.env')})
const pg = require('pg');

require('dotenv').config();

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
        `SELECT * FROM dex_tables`
    );
    return product;
}

const getUserInfoByEmail = async (email) => {
    const userInfo = await pgClient.query(`SELECT * FROM users WHERE email = '${email}';`)
    return userInfo;
}

const createNewUser = async ({name, hashedPassword, email}) => {
    const userInfo = await pgClient.query(`INSERT INTO users VALUES (default, '${name}', '${hashedPassword}', '${email}');`)
    return userInfo
}
// getUserInfoByEmail('ddd@aaa.com')
// pgClient.query(`INSERT INTO Users VALUES (default, 'DUCKDUCKGO', 123, '123@123')`)

module.exports = pgClient;
