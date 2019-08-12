const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../../db/db.js');

const authenticate = (req, res, next) => {
  const {email, password} = req.query;
  
  next();
}

module.exports = { authenticate };