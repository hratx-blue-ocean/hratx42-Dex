const pgClient = require('../hosteddb');
const decksModel = require('./decks.js');
const cardsModel = require('./cards.js');

const tablesModel = {
    async get(id){
        const query = 'select * from tables where id = $1'
        const {rows: tables} = await pgClient.query(query, id);
        return tables[0];
    },
    async delete(id){
        const query = 'delete from tables where id = $1';
        const values = [id]
        const result = await pgClient.query(query, values)
        return result;
    }
}

module.exports = tablesModel;