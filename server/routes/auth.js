var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./config.js');

// const db = require('../../db/hosteddb');

router.post('/', async (req, res)=>{
    const submitted = req.body.email;
    let user;
    //get user from database where email = req.body.
    //if no user
        //res.status(400).send("no user")
    const passwordIsValid = await bcrypt.compare(submitted.password, user.password)
    if (!passwordIsValid)
      return res.status(400).send("Invalid username or password");

    const token = jwt.sign({_id: user.id}, config.secret);
    res.header("x-access-token", token).send(token);
})