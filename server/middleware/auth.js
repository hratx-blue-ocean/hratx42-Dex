const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./config.js');
const jwt = require('jsonwebtoken');

//connect to db later
const db = require('../../db/hosteddb.js');

const auth = (req, res, next) => {
  console.log(req.body)
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  //get user email
  db.getUserInfoByEmail(email)
  //if user email not found send error message
  .catch((err) => {
    console.log('Getting user info by email in auth middleware failed', err);
    res.sendStatus(403).json({
      success: false,
      message: "Unexpected Error occurred please try later"
    });
  })
  //if user email found, compare password
  .then(async (result) => {
    if(result.rowCount === 0) {
      res.json({
        success: false,
        message: "Email not found"
      });
    }
    let user = result.rows[0];
    console.log("USER", user);
    const match = await bcrypt.compare(password, user.password);
    console.log('match', match)
    if(match) {
      console.log('herherhehr')
      let token = jwt.sign({ email }, config.secret, { expiresIn: '7 days' });
      res.json({
        success: true, 
        message: "Authentication Successful", 
        token
      })
    } else {
      console.log('here')
      res.json({
        success: false,
        message: "Password is incorrect"
      })
    }
  })
  
}

module.exports = { auth }