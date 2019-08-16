const jwt = require('jsonwebtoken');
// const config =require('./config.js');
const config = {secret: "supersecuresecret"};

const parseCookie = (cookieStr, cookie) => {
  const cookies = cookieStr.split(" ");
  let value = cookies.filter((c) =>  {
    if (c.indexOf(`${cookie}=`) > -1) {
      return true
    }
    return false;
  })[0];
  return value.slice(cookie.length + 1);
}

const checkToken = (req, res, next) => {
  let token = parseCookie(req.headers.cookie, 'token');
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        console.log('error verifying jwt', err);
        return res.status(403).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = decoded.userId;
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