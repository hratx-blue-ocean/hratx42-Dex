const pgClient = require('../hosteddb');
const decksModel = require('./decks.js');
const cardsModel = require('./cards.js');

const tablesModel = {
    async get(id){
        const query = 'select * from dex_tables where id = $1'
        const {rows: tables} = await pgClient.query(query, [id]);
        return tables[0];
    },
    async getByUserId(userId){
        const query = 'select t.* from dex_tables t inner join tables_members tm on t.id = tm.table_id where tm.member_id = $1';
        const results = await pgClient.query(query, [userId]);
        return results.rows;
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

    async delete(id){
        const query = 'delete from dex_tables where id = $1';
        const values = [id]
        const result = await pgClient.query(query, values)
        return result;
    }
}

module.exports = tablesModel;