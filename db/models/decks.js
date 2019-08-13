const pgClient = require('../hosteddb');

const decksModel = {
    async getByTableId(tableId){
        //@TODO: Here goes the monster query
        const query = `select * from decks where table_id = $1`
        const values = [tableId]
        const decks = await pgClient.query(query, values);
        return decks;
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