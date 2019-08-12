
import tables from '../dummyData/tables.js'
import decks from '../dummyData/decks';

const mockHttp = {
  async getTables(userId) {
    try {
      // const tables = fs.readFileSync('../dummyData/tables.json', 'utf-8');
      return JSON.parse(tables);
    } catch (error) {
      console.error(error);
    }
  },
  async getDecks(tableId) {
    try {
      // let decks = JSON.parse(fs.readFileSync('../dummyData/decks.json'));
      let filteredDecks = decks.filter(deck => deck.table_id === tableId);
      return filteredDecks;
    } catch (error) {
      console.error(error);
    }
  },
  async postUser(email, password){
    try {
      console.log("User posted...", email, password)
    } catch (error) {
      console.error(error)
    }
  }
};

export default mockHttp;
