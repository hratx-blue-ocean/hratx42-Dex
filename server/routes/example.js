const router = require('express').Router();
const db = require('../../db/hosteddb');
// dashboard or login/sign up page
router.get('/', (req, res) => {
    // if cookies, let front end know
    res.json({data:['dolphins', 'manatees', 'sea turles']})
})

// USERS

router.get('/users:id', (req, res) => {    // get user based on id
    // query db for user based on id
});
router.post('users/', (req, res) => {      // create new user
    // get body data to db
});
router.put('users/:id', (req, res) => {    // update user info
    // update db for user with req.params.id
});
router.delete('users/:id', (req, res) => { // remove user from db
    // delete user from db
})

// DECKS
router.post('decks/', (req, res) => {      // create new deck
    // get body data to db
});
router.put('decks/:id', (req, res) => {    // update deck info
    // update db for user with req.params.id
});
router.delete('decks/:id', (req, res) => { // remove deck from db
    // delete deck from db
})

// TABLES
router.get('tables?user=:id', (req, res) => { // get tables associated with user
    // query db for tables from user with id
});
router.get('tables/:id', (req, res) => {      // getting all data of table
    // query db for table with decks, cards, users based on id
});
router.post('tables', (req, res) => {        // creating new table
    // add body data to db
});
router.put('tables/:id', (req, res) => {     // update table in db
    // update table in db
});
router.delete('tables/:id', (req, res) => {  // delete table from db
    // delete table from db
});

// CARDS
router.post('cards', (req, res) => {        // add card to db
    // add card to db
});
router.put('cards/:id', (req, res) => {     // update card in db
    // update card in db
});
router.delete('cards/:id', (req, res) => {  // delte card from db
    // delete card from db
});

module.exports = router;