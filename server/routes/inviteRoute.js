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
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <style>
              body {
                  display: grid;
                  place-items: center;
              }
              .btn {
                  height: 40px;
                  width: 80px;
                  border: 1px solid grey;
                  margin: .5rem;
              }
      
              .yes {
                  background: #00da00;
              }
      
              .no {
                  background: #ff4949;
              }
      
              .yes:hover, .no:hover {
                  cursor: pointer;
              }
          </style>
      </head>
      <body>
          <h2>user has invited you to join table name</h2>
          <div>
          <input type="text" />
              <button class="btn yes">yes</button>
              <button class="btn no">no</button>
          </div>
      </body>
      </html>
      `// plain text body
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