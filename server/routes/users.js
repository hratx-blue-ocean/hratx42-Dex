var express = require('express');
var router = express.Router();
const usersModel = require('../../db/models/users');
const tablesModel = require('../../db/models/tables.js');
const cardsModel = require('../../db/models/cards.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwtChecker = require('../middleware/jwtChecker.js');
const auth = require('../middleware/auth.js');
const tryCatch = require('../utils/tryCatch');

// router.use(jwtChecker.checkToken);
router.get('/:id', (req, res) => {
  const id = req.params.id;
  usersModel
    .getUserByID(id)
    .then(user => {
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
    let tableId = req.headers.cookie ? req.cookies.tableId ? req.cookies.tableId : null : null;
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
                  if(tableId) {
                    usersModel.getUserInfoByEmail(email)
                    .then((newUser) => {
                      return tablesModel.addUserToTable(tableId, newUser.id)
                    })
                    .then((addedTableToNewUser) => {
                      res.clearCookie('tableId')
                      next();
                    })
                    .catch((err) => {
                      console.log('error happened during adding invited user to table', err);
                      res.status(403).json({
                        success: false,
                        message: 'Error in adding you to invited table.'
                      })
                    })
                  } else {
                    console.log('THIS IS NOT GOOD');
                    next()
                  }
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
  const userId = req.user;
  const id = req.params.id;
  const userObj = req.body;
  userObj.id = id;
  //@TODO: turn this back on
  // if (userId !== id) {
  //   return res.status(401).send({ message: 'Unauthorized' });
  // }
  usersModel
    .getUserByID(id)
    .then(user => {
      if (!user) {
        //if user does not exist, send message
        res
          .status(400)
          .json({ success: false, message: 'Invalid credentials' });
      } else {
        //if user exists, update user
        bcrypt
          .hash(userObj.password, saltRounds)
          .then(hashedPassword => {
            userObj.password = hashedPassword;
            usersModel
              .updateUser(userObj)
              .then(updatedUser => {
                updatedUser.password = '';
                res.status(201).send(updatedUser);
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
      }
    })
    .catch(err => {
      console.log('Error getting user info @users.js', err);
      res.status(404).send(JSON.stringify(id));
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const userId = req.user;
  //@TODO: turn this back on
  // if (userId !== id) {
  //   return res.status(401).send({ message: 'Unauthorized' });
  // }
  usersModel
    .getUserByID(id)
    .then(user => {
      if (user) {
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

router.get('/:id/cards/', async (req, res) => {
  const userId = req.params.id;
  tryCatch(async () => {
    const user = await usersModel.getUserByID(userId);
    if (user){
      const cards = await cardsModel.getCardsByUserID(userId);
      res.status(201).send(cards)
    }else{
      res.status(404).json({ success: false, message: 'Error getting user' });
    }
  }, res);
})

router.get('/:userId/table/:tableId/cards', async (req, res) => {
  const {userId, tableId} = req.params; 
  tryCatch(async () => {
    const count = await cardsModel.countUserCardsByTable(userId, tableId);
    res.status(201).send(count);
  })
})

module.exports = router;