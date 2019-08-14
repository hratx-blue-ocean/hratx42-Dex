const jwt = require('jsonwebtoken');
// const config =require('./config.js');
const config = {secret: "supersecuresecret"};

const checkToken = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log('error veryfying jwt', err);
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(404).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports =  {checkToken };