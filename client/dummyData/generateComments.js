const faker = require('faker');
const fs = require('fs');
const config = require('./config');

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
  fs.writeFile('comments.json', JSON.stringify(comments), err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Comments made');
    }
  });
}

generateComments(50);
