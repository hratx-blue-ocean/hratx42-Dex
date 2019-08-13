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

<<<<<<< HEAD
const getTablesByUser = async (id) => {
    const tables = await pgClient.query(`SELECT name, id FROM table WHERE userID = ${id}`);
    return tables;
}

const getUserByID = async (id) => {
    const user = await pgClient.query(`SELECT name, id, etc FROM User where id = ${id};`);
    return user;
}
=======
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41

module.exports =  pgClient


<<<<<<< HEAD
const deleteTableByID = async (id) => {
    const deleteFromTable = await pgClient.query(`DELETE FROM tables WHERE id = ${id}`);
    return deleteFromTable;
}

const deleteDeckByID = async (id) => {
    const deleteDeck = await pgClient.query(`DELETE FROM decks WHERE id = ${id}`);
    return deleteDeck;
}

const deleteUserByID = async (id) => {
    const deleteUser = await pgClient.query(`DELETE FROM users WHERE id = ${id}`);
    return deleteUser;
}

const deleteCardByID = async (id) => {
    const deleteCard = await pgClient.query(`DELETE FROM cards WHERE id = ${id}`);
    return deleteCard;
}

const db = {
    getUserByID: async (id) => {
        // email and password
        const userInfo = await pgClient.query(`SELECT email, password FROM users WHERE id = ${id};`)
        return userInfo;
    },
    deleteUserByID: async (id) => {
        const deleteUser = await pgClient.query(`DELETE FROM users WHERE id = ${id};`)
        return deleteUser;
    },
    updateUser: async (user) => {
        const updated = await pgClient.query(`UPDATE users SET email = ${user} password = ${password} WHEN id = ${user.id}`);
        return updated;
    }
}

module.exports = {  db, deleteCardByID, 
                    deleteUserByID, deleteDeckByID, deleteTableByID, 
                    getTablesByUser, getUserByID, getUserInfoByEmail };
=======
>>>>>>> 852cb0997c5e8d1a0d4ac98e488d1bbafbfe6d41
