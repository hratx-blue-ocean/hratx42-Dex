var express = require('express');
var router = express.Router();
const tablesModel = require('../../db/models/tables');
const usersModel = require('../../db/models/users');
const tryCatch = require('../utils/tryCatch');

// router.use(jwtChecker.checkToken);
router.get('/', async (req, res) => {
  //query string like ?userId=123
  const { userId } = req.query;
  //if req.user
  try {
    const tables = await tablesModel.getByUserId(userId);
    res.status(200).send(tables);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

router.get('/:id/users', async (req, res) => {
  tryCatch(async () => {
    const tableId = req.params.id;
    const users = await usersModel.getUsersByTableId(tableId);
    res.status(200).send(users);
  }, res);
});

router.post('/', (req, res) => {
  tryCatch(async () => {
    const tableName = req.body.name;
    const table = await tablesModel.create(tableName);
    res.status(200).json(table);
  }, res)
});

router.put('/:id', (req, res)=>{
    const table = req.body;
    const id = req.params.id
    table.id=id
    //if req.user && user owns table
        //update table
    res.status(200).send(JSON.stringify(table));
})

router.delete('/:id', (req, res) => {
  tryCatch(async ()=>{
    const tableId = req.body.tableId;
    const result = await tablesModel.delete(tableId);
    res.status(200).json({ ok: 'deleted' });
  }, res)
});

router.post('/:tableId/member', async (req, res) => {
  tryCatch(async () =>{
    const userEmail = req.body.email;
    const tableId = req.params.tableId;
    const { rows: dbResults } = await usersModel.getUserInfoByEmail(userEmail);
    const user = await dbResults[0];
    if (!user) {
      res.status(404).json({ error: 'not found' });
      return;
    } else {
      const result = await tablesModel.addUserToTable(tableId, user.id);
      await console.log('result: ', result);
      res.status(200).json({ ok: `added user ${user.id} to table ${tableId}` });
    }
  }, res)
});

router.delete('/:tableId/member/:userId', async (req, res) => {
  tryCatch(async ()=>{
    const tableId = req.params.tableId;
    const userId = req.params.userId;
    let result = await tablesModel.removeUserFromTable(tableId, userId)
    if (result){
      res.status(200).json({ ok: `removed user ${userId} from card ${cardId}` });
    }else {
      res.status(404).json({ error: 'not found' });
    }
  }, res)
});

module.exports = router;
