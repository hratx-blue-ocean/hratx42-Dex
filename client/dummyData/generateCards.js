const faker = require('faker');
const writeFile = require('./writeFile.js');
const config = require('./config.js');

function generateCards(n) {
  const cards = [];
  for (let i = 0; i < n; i++) {
    let card = {
      id: i,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      labels: generateLabels(),
      impact: Math.floor(Math.random() * 13),
      dueDate: faker.date.future(),
      description: faker.hacker.phrase(),
      weight: Math.floor(Math.random() * 13),
      gitLink: 'https://github.com/hratx-blue-ocean/hratx42-Dex',
      comments: generateComments(Math.floor(Math.random() * 4)),
      deck_id: Math.floor(Math.random() * (config.numberOfDecks + 1)),
    };
    cards.push(card);
  }
  return cards;
}

function generateLabels() {
  const labels = [];
  const numberOfLabels = Math.floor(Math.random() * 4);
  for (let i = 0; i < numberOfLabels; i++) {
    let label = faker.hacker.ingverb();
    labels.push(label);
  }
  return labels;
}

function generateComments(n) {
  let comments = [];
  for (let i = 0; i < n; i++) {
    let comment = {
      id: i,
      createdAt: faker.date.recent(),
      text: faker.lorem.sentence(),
      card_id: Math.floor(Math.random() * (config.numberOfCards + 1)),
    };
    comments.push(comment);
  }
  return comments;
}

generateCards(config.numberOfCards);

module.exports = generateCards;
