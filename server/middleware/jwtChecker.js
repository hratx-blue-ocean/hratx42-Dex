const jwt = require('jsonwebtoken');
// const config =require('./config.js');
const config = { secret: "supersecuresecret" };

const checkToken = (req, res, next) => {
  let cookies = req.cookies
  if (!cookies) {
    return res.status(404).json({
      success: false,
      message: 'Please sign in'
    });
  }
  let token = req.cookies.token
  if (!token) {
    return res.status(404).json({
      success: false,
      message: 'Please sign in'
    });
  }
  console.log("The cookie token ", token)
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log('error verifying jwt', err);
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        console.log("Token is valid")
        req.user = decoded.userId;
        next();
      }
    });
  }
};

module.exports = { checkToken };