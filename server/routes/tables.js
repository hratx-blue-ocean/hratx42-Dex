var express = require('express')
var router = express.Router()
const jwtChecker = require('../middleware/jwtChecker')
const db = require('../../db/hosteddb');
// router.use(jwtChecker.checkToken);
router.get('/', (req, res)=>{
    //query string like ?userId=123
    const {userId} = req.query;
    //if req.user
        //db.get tables where user_id = userId
    res.status(200).send(`Tables for user ${userId}`)
})

// router.get('/table-master/:id', async (req, res) => {
//     console.log(req.params.id);
//     // console.log(req.id);
//     const tableDataRows = await db.getMasterTableData(req.params.id).rows;
//     // tableData = tableData.
//     const tableData = {
// 
//     };
//     tableData.id = tableDataRows[0].table_id;
//     tableData.name = '';
//     res.status(200).send(JSON.stringify(tableDataRows))
// })

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