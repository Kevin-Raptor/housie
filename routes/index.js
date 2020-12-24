var express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();

var router = express.Router();

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.post('/send', (req, res) => {
  console.log("req", req.body)
  const output = `
  <h3>Here are your cards Mr. ${req.body.name}</h3>
  <img src="${req.body.card1.image}" height="200px"></img>
  <img src="${req.body.card2.image}" height="200px"></img>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',

    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }

  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '<your@email.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Cards', // Subject line
    text: 'Hello world?', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Shit")
      res.send(error);

      return console.log(error);
    }
    console.log('Message sent to: %s', req.name);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('hello');
  });

});


module.exports = router;
