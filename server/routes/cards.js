const express = require('express');
const router = express.Router();

//middleware
const authorization = require('../middleware/authorization')

//models
const cardsModel = require('../../db/models/cards');
const usersModel = require('../../db/models/users');

//utils
const tryCatch = require('../utils/tryCatch');

//get card info by cardID
router.get('/:id', authorization.userOwnsCard, (req, res) => {
  const cardId = req.params.id;
  tryCatch(async () => {
    const card = await cardsModel.getCardByID(cardId);
    res.status(200).send(card);
  });
});

//create new card
router.post('/', (req, res) => {
  const card = req.body;
  //@TODO: change this line
  tryCatch(async () => {
    let newCard = await cardsModel.createNewCard(card);
    let newPopulatedCard = await cardsModel.getCardByID(newCard.id)
    res.status(200).send(newPopulatedCard);
  });
});

//update card
router.put('/:id', authorization.userOwnsCard, async (req, res) => {
  const card = req.body
  card.id = req.params.id
  tryCatch(async () => {
    await cardsModel.updateCard(card);
    const updatedCard = await cardsModel.getCardByID(card.id)
    res.status(200).send(updatedCard);
  });
});

//delete card by cardID 
router.delete('/:id', authorization.userOwnsCard, (req, res) => {
  const cardId = req.params.id;
  tryCatch(async () => {
    await cardsModel.delete(cardId);
    res.status(200).send({ message: 'Card Deleted' });
  });
});

router.post('/:id/member/:userId', authorization.userOwnsCard, async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.id;
    const userId = req.params.userId;
    console.log(cardId, userId)
    const user = await usersModel.getUserByID(userId);
    console.log("The user ", user)
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

router.delete('/:id/member/:userId', authorization.userOwnsCard, async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.id;
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

router.post('/:id/label/:labelId', authorization.userOwnsCard, async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.id;
    const labelId = req.params.labelId;
    if (labelId < 5 || labelId > 14) {
      return res.status(400).send({ message: "Invalid label Id" })
    }
    await cardsModel.addLabelToCard(cardId, labelId);
    const updatedCard = await cardsModel.getCardByID(cardId)
    res.status(200).send(updatedCard);
  }, res);
});

router.delete('/:id/label/:labelId', authorization.userOwnsCard, async (req, res) => {
  tryCatch(async () => {
    const cardId = req.params.id;
    const labelId = req.params.labelId;
    if (labelId < 5 || labelId > 14) {
      return res.status(400).send({ message: "Invalid label Id" })
    }
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
