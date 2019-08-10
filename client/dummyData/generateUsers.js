const faker = require('faker');
const fs = require('fs');
const config = require('./config');

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
  fs.writeFile('users.json', JSON.stringify(users), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Users made');
    }
  });
}

generateUsers(config.numberOfUsers);
