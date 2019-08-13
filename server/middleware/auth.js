const bcrypt = require('bcrypt');
const saltRounds = 10;
const config = require('./config.js');

//connect to db later
const db = require('../../db/hosteddb.js');



const auth = (req, res, next) => {
  const { email, password } = req.body;
  
  //get user email
  db.getUserLoginInfo(email)
  //if user email not found send error message
  .catch((noUser) => {
    res.send(403).json({
      success: false,
      message: "Email not found"
    });
  })
  //if user email found, compare password
  .then(async (user) => {
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      let token = jwt.sign({ email }, config.secret, { expiresIn: '7 days' });
      res.json({
        success: true, 
        message: "Authentication Successful", 
        token
      })
    } else {
      res.send(403).json({
        success: false,
        message: "Password is incorrect"
      })
    }
  })
  
}

module.exports = { auth }