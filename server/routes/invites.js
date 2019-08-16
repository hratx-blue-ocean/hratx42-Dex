var express = require('express');
var router = express.Router();
const tryCatch = require('../utils/tryCatch');
const nodemailer = require('nodemailer');
const tablesModel = require('../../db/models/tables.js');
const usersModel = require('../../db/models/users.js');
const emailInvite = require('../util/inviteHTML.js');

router.post('/:email', async (req, res) => {

  const {email} = req.params;
  const {tableId, invitedBy} = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
            user: 'dexteamhr@gmail.com',
            pass: 'dexteamsupport'
        }
    });

  const mailOptions = {
    from: 'dexteamhr@gmail.com', // sender address
    to: `${email}`, // list of receivers
    subject: `Hi! this is dex team. You are invited by ${invitedBy}`, // Subject line
    html: emailInvite(req.headers.host, tableId, invitedBy)
  };

  usersModel
    .getUserInfoByEmail(email)
    .then((user) => {
      if(user) {
        return tablesModel.addUserToTable(tableId, user.id)
      } 
    })
    .finally(() => {
      transporter.sendMail(mailOptions, function (err, info) {
        if(err) {
          console.log(err)
          res.status(400).json({success: false, message: "Unexpected Error occurred, please try later"})
        } else {
          console.log(info);
          res.status(200).json({success: true, message: "Succesfully sent invitation!"})
        }
      });
    })
  // create reusable transporter object using the default SMTP transport

  // send mail with defined transport object

});

  router.get('/:tableId', (req, res) => {
    let { tableId } = req.params
    res.cookie('tableId', tableId).redirect('/');
  })

module.exports = router;