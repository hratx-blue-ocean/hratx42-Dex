const faker = require('faker');
const writeFile = require('./writeFile');
const config = require('./config');

function generateTables(n) {
  let tables = [];
  for (let i = 0; i < n; i++) {
    let table = {
      id: i,
      name: faker.hacker.noun(),
      photo: faker.image.image(),
      users: generateUsers(config.numberOfUsers),
    };
    tables.push(table);
  }
  writeFile('tables', tables);
}

function generateUsers(n) {
  let users = [];
  for (let i = 0; i < n; i++) {
    let user = {
      id: i,
      email: faker.internet.email(),
      name: faker.internet.userName(),
      photo: faker.image.animals(),
    };
    users.push(user);
  }
  return users;
}

generateTables(4);
