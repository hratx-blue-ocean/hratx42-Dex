var express = require('express')
var router = express.Router()
<<<<<<< HEAD
const db = require('../../db/hosteddb');
=======
const decksModel = require('../../db/models/decks');
const tryCatch = require('../utils/tryCatch');
>>>>>>> 64efcd5adf801791c2d04e8431d506445f355c8f

router.get('/', (req, res)=>{
    //query string like ?tableId=123
    const {tableId} = req.query;
    //if req.user && user owns table
    tryCatch(async()=>{
        //this is where the monster query goes
        const {rows: decks} = await decksModel.getByTableId(tableId);
        res.status(200).send(decks)
    })
})

router.get('/:id/cards', (req, res) =>{
    db.getCardsByDeckId(req.params.id)
    .then(results => results.rows)
    .then(rows => res.status(200).json(rows))
    .catch(err => console.error(err))
})

router.post('/', (req, res)=>{
    const deck = req.body;
    //if req.user
    tryCatch(async ()=>{
        const result = await decksModel.post(deck)
        res.status(200).send(result)
    })
})

router.put('/:id', (req, res)=>{
    const deck = req.body;
    const id = req.params.id
    deck.id=id
    //if req.user && user owns deck's table
    tryCatch(async ()=>{
        let result = await decksModel.put(deck)
        console.log(result)
        res.status(200).send(deck)
    })
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    //if req.user && user owns table of deck
    const result = await decksModel.delete(id);
    console.log(result)
    res.status(200).send(`Deleted deck ${id}`);
})

module.exports = router;