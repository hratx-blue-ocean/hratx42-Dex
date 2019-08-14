var express = require('express')
var router = express.Router()
const tablesModel = require('../../db/models/tables')

// router.use(jwtChecker.checkToken);
router.get('/', async (req, res)=>{
    //query string like ?userId=123
    const {userId} = req.query;
    //if req.user
    try{
        const tables = await tablesModel.getByUserId(userId);
        res.status(200).send(JSON.stringify(tables))
    } catch (error){
        res.status(500).send({message: "Internal server error"})
    }
})


router.post('/', (req, res)=>{
    const table = req.body;
    //if req.user
        //post table
    res.status(200).send(JSON.stringify(table))
})

router.put('/:id', (req, res)=>{
    const table = req.body;
    const id = req.params.id
    table.id=id
    //if req.user && user owns table
        //update table
    res.status(200).send(JSON.stringify(table));
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    //if req.user && user owns table
        //delete table
    res.status(200).send(`Deleted table ${id}`);
})

module.exports = router;