const bcrypt = require('bcrypt');
// const config = require('./config.js');
const jwt = require('jsonwebtoken');
const config = { secret: 'supersecuresecret' };

//connect to db later
const usersModel = require('../../db/models/users');

const auth = (req, res, next) => {
  const { email, password } = req.body;
  //get user email
  usersModel
    .getUserInfoByEmail(email)
    .catch(err => {
      console.log('Getting user info by email in auth middleware failed', err);
      return res.status(403).json({
        success: false,
        message: 'Unexpected Error occurred please try later',
      });
    })
    //if user email found, compare password
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Email not found',
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (match) {
              let token = jwt.sign({ userId: user.id }, config.secret, {
                expiresIn: '7 days',
              });
              res
                .header('x-access-token', token)
                .status(201)
                .json({
                  success: true,
                  message: 'Authentication Successful',
                  token,
                });
            } else {
              res.status(403).json({
                success: false,
                message: 'Password is incorrect',
              });
            }
          })
          .catch(error => {
            console.log('error comparing password', error);
            res.status(403).json({
              success: false,
              message: 'Unexpected Error occurred please try later',
            });
          });
      }
    });
};

module.exports = { auth };
