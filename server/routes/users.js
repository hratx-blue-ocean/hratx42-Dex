var express = require('express');
var router = express.Router();
const usersModel = require('../../db/models/users');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwtChecker = require('../middleware/jwtChecker.js');
const auth = require('../middleware/auth.js');

// router.use(jwtChecker.checkToken);
router.get('/:id', (req, res) => {
  const id = req.params.id;
  usersModel
    .getUserByID(id)
    .then(user => {
      console.log('The user', user);
      res.status(200).send(user);
    })
    .catch(err => {
      res
        .status(402)
        .send('Unexpected error occurred @routes/users.js in getting user');
    });
});

router.post(
  '/',
  (req, res, next) => {
    const { email, password, name } = req.body;
    //post user to usersModel if she doesn't already exist
    usersModel
      .getUserInfoByEmail(email)
      .then(user => {
        if (!user) {
          //if email does not exist create user
          bcrypt
            .hash(password, saltRounds)
            .then(hashedPassword => {
              usersModel
                .createNewUser({ name, hashedPassword, email })
                .then(userCreated => {
                  next();
                })
                .catch(error => {
                  console.log('creating new user failed', error);
                  res.status(403).json({
                    success: false,
                    message: 'Unexpected Error Occurred Try Later.',
                  });
                });
            })
            .catch(error => {
              console.log('creating new user password has failed', error);
              res.status(403).json({
                success: false,
                message: 'Unexpected Error Occurred Try Later.',
              });
            });
        } else {
          //if email already exists, send message
          res
            .status(400)
            .json({ success: false, message: 'Username already exists' });
        }
      })
      .catch(err => {
        console.log('Error getting user info @users.js line 37', err);
        res.status(404).send('error getting user');
      });
  },
  auth.auth
);

router.put('/:id', (req, res) => {
  const { email, password, name, imageURL } = req.body;
  //post user to usersModel if she doesn't already exist
  const id = req.params.id;
  usersModel
    .getUserByID(id)
    .then(result => {
      if (result.rowCount > 0) {
        //if user exists, update user
        bcrypt
          .hash(password, saltRounds)
          .then(hashedPassword => {
            usersModel
              .updateUser({ name, hashedPassword, email, id, imageURL })
              .then(userUpdated => {
                res
                  .status(201)
                  .json({ success: true, message: 'Account Updated!' });
              })
              .catch(err => {
                console.log('Error updating user @users.js', err);
                res.status(403).json({
                  success: false,
                  message: 'Unexpected Error Occurred Try Later.',
                });
              });
          })
          .catch(error => {
            console.log('error creating hash password', error);
            res.status(403).json({
              success: false,
              message: 'Unexpected Error Occurred Try Later.',
            });
          });
      } else {
        //if user does not exist, send message
        res
          .status(400)
          .json({ success: false, message: 'User does not exist' });
      }
    })
    .catch(err => {
      console.log('Error getting user info @users.js', err);
      res.status(404).send(JSON.stringify(id));
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  usersModel
    .getUserByID(id)
    .then(result => {
      if (result.rowCount > 0) {
        usersModel
          .deleteUser(id)
          .then(() => {
            res
              .status(201)
              .json({ success: true, message: 'Account Deleted!' });
          })
          .catch(err => {
            console.log('Error deleting user @users.js', err);
            res.status(403).json({
              success: false,
              message: 'Unexpected Error Occurred Try Later.',
            });
          });
      } else {
        res
          .status(400)
          .json({ success: false, message: 'User does not exist' });
      }
    })
    .catch(err => {
      console.log('Error getting user @users.js', err);
      res.status(404).json({ success: false, message: 'Error getting user' });
    });
});

module.exports = router;
