const express = require('express');
const router = express.Router();
const db = require('../../db/hosteddb');

//get card info by cardID
router.get('/:id', (req, res) => {
  const cardId = req.params.id;
  //if req.user && user owns table associated with card
  //get card
  db.getCardByID(cardId)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(404);
    });
});

//create new card
router.post('/', (req, res) => {
  const card = req.body;
  //if req.user
  //post card
  db.createNewCard(card)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(404);
    });
});

//update card
router.put('/:id', (req, res) => {
  const card = req.body;
  const id = req.params.id;
  //if req.user && user owns card's table
  //update table
  db.updateCard(card, id)
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
  db.deleteCard(id)
    .then(response => {
      res.status(200).send(`Deleted card ${id}`);
    })
    .catch(err => {
      res.status(404);
    });
});

module.exports = router;
