var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const config = require('./config.js');
const config = {secret: "supersecuresecret"}
const Auth = require('../middleware/auth.js');
const jwtChecker = require('../middleware/jwtChecker.js');

// const db = require('../../db/hosteddb');

router.use(Auth.auth);
router.use(jwtChecker.checkToken);
router.post('/', async (req, res)=>{
    const { email, password } = req.body;
    //get user from database where email = req.body.
    //if no user
        //res.status(400).send("no user")
    const passwordIsValid = await bcrypt.compare(submitted.password, user.password)
    if (!passwordIsValid)
      return res.status(400).send("Invalid username or password");
    const token = jwt.sign({_id: user.id}, config.secret);
    res.header("x-access-token", token).send(token);
});


module.exports = router;