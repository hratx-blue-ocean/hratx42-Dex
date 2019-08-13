const bcrypt = require('bcrypt');
// const config = require('./config.js');
const jwt = require('jsonwebtoken');
const config = {secret: "supersecuresecret"}

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
  if(req.method === 'GET') {
    res.sendStatus(404);
  } else {
    const { email, password } = req.body;
    //get user email
    db.getUserInfoByEmail(email)
    //if user email not found send error message
    .catch((err) => {
      console.log('Getting user info by email in auth middleware failed', err);
      res.status(403).json({
        success: false,
        message: "Unexpected Error occurred please try later"
      });
    })
    //if user email found, compare password
    .then(async (result) => {
      if(result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Email not found "
        });
      }
      let user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if(match) {
        let token = jwt.sign({ userId: user.id }, config.secret, { expiresIn: '7 days' });
        // req.user = token;
        res.header("x-access-token", token).status(201).json({
          success: true, 
          message: "Authentication Successful", 
          token
        })
      } else {
        res.status(403).json({
          success: false,
          message: "Password is incorrect"
        })
      }
    })
  }

  
}

module.exports = { auth, checkToken }