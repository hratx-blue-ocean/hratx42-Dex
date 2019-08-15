var express = require('express');
var router = express.Router();
const tryCatch = require('../utils/tryCatch');
const nodemailer = require('nodemailer');

router.post('/:email', async (req, res) => {
  console.log('hi');
  const {email} = req.params;
  const {tableId, invitedBy} = req.body;
  console.log(email);
  console.log(req.hostname);
  console.log(tableId, invitedBy);
  async function main(){
  
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
             user: 'dexteamhr@gmail.com',
             pass: 'dexteamsupport'
         }
     });
    const mailOptions = {
      from: 'dexteamhr@gmail.com', // sender address
      to: `${email}`, // list of receivers
      subject: 'Hi DJ! this is dex tema', // Subject line
      html: '\nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
  }
  
  // main().catch(console.error);
});

module.exports = router;