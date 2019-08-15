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
  const userId = req.user || true;
  tryCatch(async () => {
    if (userId) {
      let newCard = await cardsModel.createNewCard(card);
      let newPopulatedCard = await cardsModel.getCardByID(newCard.id)
      res.status(200).send(newPopulatedCard);
    } else {
      res.status(401).send({ message: 'Unauthorized' });
    }
  });
});

//update card
router.put('/:id', async (req, res) => {
  const card = req.body;
  const userId = req.user;
  if (!card.id) {
    res.status(400).send({
      message: 'You need to send a card object with an id key and value',
    });
    return;
  }
  tryCatch(async () => {
    const authorized = await authorizationModel.user.ownsCard(userId, card.id);
    if (authorized) {
      await cardsModel.updateCard(card);
      const updatedCard = await cardsModel.getCardByID(card.id)
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

router.post('/:cardId/member/:userId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.params.userId;
    console.log(cardId, userId)
    const user = await usersModel.getUserByID(userId);
    if (!user) {
      res.status(404).json({ error: 'not found' });
      return;
    } else {
      await cardsModel.addUserToCard(cardId, userId);
      const updatedCard = await cardsModel.getCardByID(cardId)
      res.status(200).send(updatedCard);
    }
  }, res);
});

router.delete('/:cardId/member/:userId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const userId = req.params.userId;
    let result = await cardsModel.removeUserFromCard(cardId, userId);
    if (result) {
      const updatedCard = await cardsModel.getCardByID(cardId)
      res
        .status(200)
        .send(updatedCard);
    } else {
      res.status(404).json({ error: 'not found' });
    }
  }, res);
});

router.post('/:cardId/label/:labelId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const labelId = req.params.labelId;
    await cardsModel.addLabelToCard(cardId, labelId);
    const updatedCard = await cardsModel.getCardByID(cardId)
    res.status(200).send(updatedCard);
  }, res);
});

router.delete('/:cardId/label/:labelId', async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.cardId;
    const labelId = req.params.labelId;
    let result = await cardsModel.removeLabelFromCard(cardId, labelId);
    if (result) {
      const updatedCard = await cardsModel.getCardByID(cardId)
      res.status(200).send(updatedCard);
    } else {
      res.status(404).json({ message: 'card not found' });
    }
  }, res);
});

module.exports = router;
