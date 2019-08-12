const fs = require('fs');

const mockHttp = {
  async getTables(userId) {
    try {
      const tables = fs.readFileSync('../dummyData/tables.json', 'utf-8');
      return JSON.parse(tables);
    } catch (error) {
      console.error(error);
    }
  },
  async getDecks(tableId) {
    try {
      let decks = JSON.parse(fs.readFileSync('../dummyData/decks.json'));
      decks = decks.filter(deck => deck.table_id === tableId);
      return decks;
    } catch (error) {
      console.error(error);
    }
  },
};

const test = {
  async getTables() {
    let tables = await mockHttp.getTables();
    console.log(tables);
  },
  async getDecks(tableId) {
    let decks = await mockHttp.getDecks(tableId);
    console.log(decks);
  },
};

test.getTables().then(() => test.getDecks(0));
