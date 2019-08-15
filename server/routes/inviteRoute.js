var express = require('express');
var router = express.Router();
const tryCatch = require('../utils/tryCatch');
const nodemailer = require('nodemailer');

router.post('/:email', async (req, res) => {
  console.log('hi');
  const {email} = req.params;
  console.log(email);
  async function main(){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
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
      html: '<button>Yes</button>'// plain text body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else
        console.log(info);
   });
  }
  
  main().catch(console.error);
});

module.exports = router;