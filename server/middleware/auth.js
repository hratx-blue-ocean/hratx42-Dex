const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./config.js');
const jwt = require('jsonwebtoken');
//connect to db later
const db = require('../../db/hosteddb.js');

const checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

const auth = (req, res, next) => {
  const { email, password } = req.body;
  
  //get user email
  db.getUserLoginInfo(email)
  //if user email not found send error message
  .catch((noUser) => {
    res.json({
      success: false,
      message: "Email not found"
    });
  })
  //if user email found, compare password
  .then(async (user) => {
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      res.json({success: true})
    } else {
      res.json({
        success: false,
        message: "Password is incorrect"
      })
    }
  })

}

module.exports = { auth, checkToken }