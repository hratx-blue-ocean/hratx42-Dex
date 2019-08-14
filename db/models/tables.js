const pgClient = require('../hosteddb');
const decksModel = require('./decks.js');
const cardsModel = require('./cards.js');

const tablesModel = {
    async create(name){
        const query = 'insert into dex_tables (name) values ($1) returning *;';
        const {rows: results} = await pgClient.query(query, [name]);
        return results[0]
    },
    async get(id){
        const query = 'select * from dex_tables where id = $1'
        const {rows: tables} = await pgClient.query(query, [id]);
        return tables[0];
    },
    async getByUserId(userId){
        const query = 'select t.* from dex_tables t inner join tables_members tm on t.id = tm.table_id where tm.member_id = $1';
        const {rows: results} = await pgClient.query(query, [userId]);
        return results;
    },
    async getCompoundData(id){
        const {rows: decks} = await decksModel.getByTableId(id)

        const decksWithCards = await Promise.all(decks.map(async deck => {
            deck.cards = await cardsModel.getCardsByDeckId(deck.id);
            console.log('deck from within map', deck);
                return deck;
            }))
        return decksWithCards;
    },
    async addUserToTable(tableId, memberId){
        console.log('add user method got', tableId, memberId);
        const query = `insert into tables_members (table_id, member_id)
                       values ($1, $2) returning member_id;`;
        const {rows: result} = await pgClient.query(query, [tableId, memberId]);
        const insertedMemberId = await result[0].member_id;
        return insertedMemberId;
    },
    async removeUserFromTable(tableId, memberId){
        console.log('add user method got', tableId, memberId);
        const query = `insert into tables_members (table_id, member_id)
                       values ($1, $2) returning member_id;`;
        const {rows: result} = await pgClient.query(query, [tableId, memberId]);
        const insertedMemberId = await result[0].member_id;
        return insertedMemberId;
    },
    async delete(id){
        const query = 'delete from dex_tables where id = $1';
        const values = [id]
        const result = await pgClient.query(query, values)
        return result;
    }
}

module.exports = tablesModel;