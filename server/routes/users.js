var express = require('express')
var router = express.Router()
const { db } = require('../../db/hosteddb');

// what data is being fetched from user --query profile table?
// what data is being updated for user --query profile table?

// require user model, put db object in user model, require db

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.getUserByID(id)
        .then((data) => res.status(200).send(JSON.stringify(data)))
        .catch(() => res.status(404).send(`Error getting user ${id}`))
})

// router.post('/', (req, res) => {
//     const user = req.body;
//     db.addNewUser(user)
//         .then((user) => res.status(200).send(JSON.stringify(user)))
//         .catch(() => res.status(404).send('Unable to create new user'));
// })

router.put('/:id', (req, res) => {
    const user = req.body;
    const id = req.params.id;
    user.id = id;
    db.updateUser(user)
        .then(() => res.status(200).send(`User ${id} updated`))
        .catch(() => res.status(404).send(`Unable to update user ${id}`));
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.deleteUserByID(id)
        .then(() => res.status(200).send(`Deleted user ${id}`))
        .catch(() => res.status(404).send(`Error deleting user ${id}`));
})

module.exports = router;