const pgClient = require('../hosteddb');
const cardsModel = require('./cards.js');

const decksModel = {
    async get(id){
        const query = 'select * from decks where id = $1'
        const {rows: decks} = pgClient.query(query, id);
        return decks[0];
    },
    async getByTableId(tableId){
        const query = `select * from decks where table_id = $1`
        const values = [tableId]
        const decks = await pgClient.query(query, values);
        return decks;
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
    async post(deck){
        const query = 'Insert into decks (id, table_id, title, table_index) values (default, $1, $2, 1)';
        const values = [deck.table_id, deck.title]
        const result = await pgClient.query(query, values);
        return result
    },
    async put(deck){
        const query = 'update decks set title = $1 where id = $2';
        const values = [deck.title, deck.id]
        const result = await pgClient.query(query, values);
        return result
    },
    async delete(deckId){
        const query = 'delete from decks where id = $1';
        const values = [deckId]
        const result = await pgClient.query(query, values)
        return result;
    }
}

module.exports = decksModel;