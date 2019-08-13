var express = require('express')
var router = express.Router()
// const db = require('../../db/hosteddb');

router.get('/:id', (req, res)=>{
    const cardId = req.params.id;
    //if req.user && user owns table associated with card
        //get card
    res.status(200).send(`Card ${cardId}`)
})

router.post('/', (req, res)=>{
    const card = req.body;
    //if req.user
        //post card
    res.status(200).send(JSON.stringify(card))
})

router.put('/:id', (req, res)=>{
    const card = req.body;
    const id = req.params.id
    card.id=id
    //if req.user && user owns card's table
        //update table
    res.status(200).send(JSON.stringify(card));
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    //if req.user && user owns table of card
        //delete table
    res.status(200).send(`Deleted card ${id}`);
})

module.exports = router;