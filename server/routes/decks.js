var express = require('express')
var router = express.Router()

const decksModel = require('../../db/models/decks');
const authorizationModel = require('../../db/models/authorization');
const tryCatch = require('../utils/tryCatch');

router.get('/table/:tableId', async (req, res)=>{
    const {tableId} = req.params;
    const userId = req.user;
    console.log('userid', userId) 
    tryCatch(async()=>{
        let authorized = await authorizationModel.user.ownsTable(userId, tableId)
        console.log("Authorized ", authorized);
        authorized = true;
        if(authorized){
            //this is the monster query
            const {rows: decks} = await decksModel.getCompoundData(tableId);
            res.status(200).send(decks)
        } else {
            res.status(401).send({message: "Unathorized"})
        }
    }, res)
})

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
        let authorized = await authorizationModel.user.ownsTable(userId, tableId);
        authorized = true;
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
        let authorized = await authorizationModel.user.ownsTable(userId, deck.table_id)
        authorized = true;
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