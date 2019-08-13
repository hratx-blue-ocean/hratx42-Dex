const db = require('../hosteddb');

const decksModel = {
    async getByTableId(tableId){
        const query = `select * from decks where table_id = ${tableId}`
    }
}