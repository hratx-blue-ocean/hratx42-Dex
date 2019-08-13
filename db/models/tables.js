const pgClient = require('../hosteddb');
const decksModel = require('./decks.js');
const cardsModel = require('./cards.js');

const tablesModel = {
    async get(id){
        const query = 'select * from tables where id = $1'
        const {rows: tables} = await pgClient.query(query, id);
        return tables[0];
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
        const query = 'delete from tables where id = $1';
        const values = [id]
        const result = await pgClient.query(query, values)
        return result;
    }
}

module.exports = tablesModel;