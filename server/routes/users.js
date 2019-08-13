var express = require('express')
var router = express.Router()
const db = require('../../db/hosteddb');
const bcrypt = require('bcrypt');
const saltRounds = 12;

router.get('/:id', (req, res)=>{
    const id = req.params.id
    res.status(200).send(`User ${id}`)
})

router.post('/', (req, res)=>{

    const { email, password, name } = req.body;
    //post user to db if she doesn't already exist

    db.getUserInfoByEmail(email)
    .then((result) => {  
        if(result.rowCount === 0) {     //if email does not exist create user
            bcrypt.hash(password, saltRounds).then((hashedPassword) => {
                db.createNewUser({name, hashedPassword, email})
                .then((userCreated) => { 
                    res.status(201).json({success: true, message: "Account Created!"})
                })
                .catch((err) => {
                    console.log('Error inserting user @users.js line 28', err);
                    res.status(403).json({success: false, message: "Unexpected Error Occurred Try Later."})
                })
            }).catch((error) => {
                console.log('error creating hash password', error)
                res.status(403).json({success: false, message: "Unexpected Error Occurred Try Later."})
            })
        } else {    //if email already exists, send message
            res.status(400).json({success: false, message: "Username already exists"})
        }
    })
    .catch((err) => {
        console.log('Error getting user info @users.js line 37', err);
        res.status(404).send(JSON.stringify(user))
    })
})

router.put('/:id', (req, res)=>{
    const user = req.body;
    const id = req.params.id
    user.id=id
    //if req.user
        //if user exists
            //update user
    res.status(200).send(JSON.stringify(user));
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    //if req.user
        //if user exists
            //delete user
    res.status(200).send(`Deleted user ${id}`);
})

module.exports = router;