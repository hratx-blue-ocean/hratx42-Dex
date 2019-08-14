const express = require('express');
const router = express.Router();
const cardsModel = require('../../db/models/cards');
const usersModel = require('../../db/models/users');
const authorizationModel = require('../../db/models/authorization');

const tryCatch = require('../utils/tryCatch');

//get card info by cardID
router.get('/:id', (req, res) => {
  const cardId = req.params.id;
  const userId = req.user;
  tryCatch(async () => {
    const authorized = await authorizationModel.user.ownsCard(userId, cardId);
    if (authorized) {
      const card = await cardsModel.getCardByID(cardId);
      res.status(200).send(card);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

//create new card
router.post('/', (req, res) => {
  const card = req.body;
  //@TODO: change this line
  console.log('The card', card);
  const userId = req.user || true;
  tryCatch(async () => {
    if (userId) {
      await cardsModel.createNewCard(card);
      res.status(200).send('YAY');
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

//update card
router.put('/:id', (req, res) => {
  const card = req.body;
  const id = req.params.id;
  //if req.user && user owns card's table
  //update table
  cardsModel
    .updateCard(card, id)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(404);
    });
});

//delete card by cardID
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  //if req.user && user owns table of card
  //delete card
  cardsModel
    .deleteCard(id)
    .then(response => {
      res.status(200).send(`Deleted card ${id}`);
    })
    .catch(err => {
      res.status(404);
    });
});

router.post('/:cardId/member', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    const user = await usersModel.getUserByID(userId);
    await console.log(user);
    // const user = await dbResults;
    if (!user) {
      res.status(404).json({ error: 'not found' });
      return;
    } else {
      const result = await cardsModel.addUserToCard(cardId, userId);
      await console.log('result: ', result);
      res.status(200).json({ ok: `added user ${userId} to card ${cardId}` });
    }
  }, res);
});

router.delete('/:cardId/member/:userId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.params.userId;
    let result = await cardsModel.removeUserFromCard(cardId, userId);
    await console.log(result);
    if (result) {
      res
        .status(200)
        .json({ ok: `removed user ${userId} from card ${cardId}` });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, res);
});

router.post('/:cardId/label', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const labelId = req.body.labelId;
    const result = await cardsModel.addLabelToCard(cardId, labelId);
    res.status(200).json({ ok: `added label ${labelId} to card ${cardId}` });
  }, res);
});

router.delete('/:cardId/label/:labelId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const labelId = req.params.labelId;
    let result = await cardsModel.removeLabelFromCard(cardId, labelId);
    await console.log(result);
    if (result) {
      res
        .status(200)
        .json({ ok: `removed label ${labelId} from card ${cardId}` });
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, res);
});

module.exports = router;
