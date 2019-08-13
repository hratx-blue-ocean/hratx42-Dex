var express = require('express')
var router = express.Router()
// const db = require('../../db/hosteddb');

router.get('/', (req, res)=>{
    //query string like ?tableId=123
    const {tableId} = req.query;
    //if req.user && user owns table
        //db.get decks where table_id = tableId
        //populate decks with cards
    res.status(200).send(`Decks for table ${tableId}`)
})

router.post('/', (req, res)=>{
    const deck = req.body;
    //if req.user
        //post table
    res.status(200).send(JSON.stringify(deck))
})

router.put('/:id', (req, res)=>{
    const deck = req.body;
    const id = req.params.id
    deck.id=id
    //if req.user && user owns deck's table
        //update table
    res.status(200).send(JSON.stringify(deck));
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    //if req.user && user owns table of deck
        //delete table
    res.status(200).send(`Deleted deck ${id}`);
})

module.exports = router;