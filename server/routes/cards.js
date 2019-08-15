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
      let newCard = await cardsModel.createNewCard(card);
      res.status(200).send(newCard);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

//update card
router.put('/:id', async (req, res) => {
  const card = req.body;
  const userId = req.user;
  //if req.user and user owns card
  if (!card.id) {
    res.status(400).send({
      message: 'You need to send a card object with an id key and value',
    });
    return;
  }
  tryCatch(async () => {
    const authorized = await authorizationModel.user.ownsCard(userId, card.id);
    if (authorized) {
      const updatedCard = await cardsModel.updateCard(card);
      res.status(200).send(updatedCard);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

//delete card by cardID
router.delete('/:id', (req, res) => {
  const cardId = req.params.id;
  const userId = req.user;
  tryCatch(async () => {
    const authorized = await authorizationModel.user.ownsCard(userId, cardId);
    if (authorized) {
      await cardsModel.delete(cardId);
      res.status(200).send({ message: 'Card Deleted' });
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

router.post('/:cardId/member', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.body.userId;
    const user = await usersModel.getUserByID(userId);
    if (!user) {
      res.status(400).json({ error: 'not found' });
      return;
    } else {
      await cardsModel.addUserToCard(cardId, userId);
      res.status(200).json({ ok: `added user ${userId} to card ${cardId}` });
    }
  }, res);
});

router.delete('/:cardId/member/:userId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.params.userId;
    let result = await cardsModel.removeUserFromCard(cardId, userId);
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
