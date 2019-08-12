const bcrypt = require('bcrypt');
const saltRounds = 10;
//connect to db later
const db = require('../../db/hosteddb.js');

const auth = (req, res, next) => {
  const { email, password } = req.body;
  
  //get user email
  db.getUserLoginInfo(email)
  //if user email not found send error message
  .catch((noUser) => {
    res.send({
      success: false,
      error: "Email not found"
    });
  })
  //if user email found, compare password
  .then(async (user) => {
    const match = await bcrypt.compare(password, user.password);
    if(match) {
      res.send({success: true})
    } else {
      res.send({
        success: false,
        error: "Password is incorrect"
      })
    }
  })

}

module.exports = { auth }