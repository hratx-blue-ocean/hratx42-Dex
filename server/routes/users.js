var express = require('express')
var router = express.Router()
// const db = require('../../db/hosteddb');

router.get('/:id', (req, res)=>{
    const id = req.params.id
    res.status(200).send(`User ${id}`)
})

router.post('/', (req, res)=>{
    const user = req.body;
    //post user to db if she doesn't already exist
    res.status(200).send(JSON.stringify(user))
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