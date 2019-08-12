const faker = require('faker');
const writeFile = require('./writeFile');
const config = require('./config');
const generateCards = require('./generateCards');

function generateDecks(numberOfTables, decksPerTable) {
  let decks = [];
  for (let tableNumber = 0; tableNumber < numberOfTables; tableNumber++) {
    for (let deckNumber = 0; deckNumber < decksPerTable; deckNumber++) {
      let deck = {
        id: deckNumber,
        table_id: tableNumber,
        title: faker.hacker.noun(),
        cards: generateCards(config.numberOfCards),
      };
      decks.push(deck);
    }
  }
  writeFile('decks', decks);
}

generateDecks(config.numberOfTables, config.decksPerTable);
