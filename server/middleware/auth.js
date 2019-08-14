const bcrypt = require('bcrypt');
// const config = require('./config.js');
const jwt = require('jsonwebtoken');
const config = {secret: "supersecuresecret"}

//connect to db later
<<<<<<< HEAD
const db = require('../../db/models/users.js')
=======
const db = require('../../db/models/users.js');
>>>>>>> feature/signup

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
    .then((result) => {
      if(result.rowCount === 0) {
        res.status(404).json({
          success: false,
          message: "Email not found "
        });
      } else {
        let user = result.rows[0];
<<<<<<< HEAD
        bcrypt.compare(password, user.password)
        .then((match) => {
=======
        bcrypt.compare(password, user.password).then((match) => {
>>>>>>> feature/signup
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
        .catch((error) => {
          console.log('error comparing password', error);
          res.status(403).json({
            success: false,
            message: "Unexpected Error occurred please try later"
          });
        })
      }
    })
  }

  
}

module.exports = { auth }