var express = require('express')
var router = express.Router()

const decksModel = require('../../db/models/decks');
const authorizationModel = require('../../db/models/authorization');
const tryCatch = require('../utils/tryCatch');

router.get('/:tableId', async (req, res)=>{
    const {tableId} = req.params;
    const userId = req.user;
    console.log('userid', userId)
    tryCatch(async()=>{
        const authorized = await authorizationModel.user.ownsTable(userId, tableId)
        console.log("Authorized ", authorized)
        if(authorized){
            //this is where the monster query goes
            const {rows: decks} = await decksModel.getByTableId(tableId);
            res.status(200).send(decks)
        } else {
            res.status(401).send({message: "Unathorized"})
        }
    }, res)
})

//dev endpoint
router.get('/dev/:tableId', async (req, res) =>{
    const {tableId} = req.params;
    const decks = await decksModel.getByTableId(tableId)
    res.status(200).json(decks) 
})

// router.get('/:id/cards', (req, res) =>{
//     db.getCardsByDeckId(req.params.id)
//     .then(results => results.rows)
//     .then(rows => res.status(200).json(rows))
//     .catch(err => console.error(err))
// })

router.post('/', (req, res)=>{
    const deck = req.body;
    if(req.user){
        tryCatch(async ()=>{
            const result = await decksModel.post(deck)
            res.status(200).send(result)
        }, res)
    } else {
        res.status(401).send({message: "Unathorized"})
    }
})

router.put('/:id', async (req, res)=>{
    const deck = req.body;
    const id = req.params.id
    deck.id=id
    const tableId = deck.table_id;
    const userId = req.user;
    tryCatch(async()=>{
        const authorized = await authorizationModel.user.ownsTable(userId, tableId)
        if(authorized){
            let result = await decksModel.put(deck)
            res.status(200).send(result)
        } else {
            res.status(401).send({message: "Unathorized"})
        }
    }, res)
})

router.delete('/:id', async (req, res)=>{
    const id = req.params.id
    const userId = req.user;
    tryCatch(async ()=>{
        const deck = await decksModel.get(id);
        const authorized = await authorizationModel.user.ownsTable(userId, deck.table_id)
        if(authorized){
            const result = await decksModel.delete(id);
            console.log(result)
            res.status(200).send(`Deleted deck ${id}`);
        } else {
            res.status(401).send({message: "Unathorized"})
        }
    }, res)
})

module.exports = router;