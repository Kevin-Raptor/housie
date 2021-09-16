var express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require("dotenv");
dotenv.config();
const { google } = require('googleapis');


var router = express.Router();

const CLIENT_ID = '678528541492-6uld0jglgl1uggs0t71uh2j1jrlmon56.apps.googleusercontent.com'
const CLIENT_SECRET = 'UtTkcSbnU2yYmFo6wH3EXYZv'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//047NQZS-4lC4VCgYIARAAGAQSNwF-L9IruiMh2Z7Ytz_Fq90Kk-mQpOGNzsrQutTW1JfqX5CWR9OX4S_e2uXZyYKNg9seeN-HC-s'

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

router.get('/debugTest', (req,res) => {
  console.log("line 1");
  let x= [1,2,3]
  console.log("line 2");
  res.send(x)
})
router.post('/send', (req, res) => {
  // console.log("req", req.body)
  const accessToken = oAuth2Client.getAccessToken();

  const {ticket} = req.body

  const output = `
  <div style="border:3px #ae0000 solid;width:fit-content">
    <div style="display:flex;margin-left:20px;">
      <h3 style="margin-left:20px;">Host Name - </h3>
      <h3>${req.body.name}</h3>
    </div>
    <table style="background-color:#ffffb0;text-align:center;font-weight:bold;border:3px #005b9c solid;margin:20px">
      <tr>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][0]?ticket[0][0]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][1]?ticket[0][1]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][2]?ticket[0][2]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][3]?ticket[0][3]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][4]?ticket[0][4]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][5]?ticket[0][5]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][6]?ticket[0][6]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][7]?ticket[0][7]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[0][8]?ticket[0][8]:''}</td>
      </tr>
      <tr>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][0]?ticket[1][0]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][1]?ticket[1][1]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][2]?ticket[1][2]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][3]?ticket[1][3]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][4]?ticket[1][4]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][5]?ticket[1][5]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][6]?ticket[1][6]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][7]?ticket[1][7]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[1][8]?ticket[1][8]:''}</td>
      </tr>
      <tr>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][0]?ticket[2][0]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][1]?ticket[2][1]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][2]?ticket[2][2]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][3]?ticket[2][3]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][4]?ticket[2][4]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][5]?ticket[2][5]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][6]?ticket[2][6]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][7]?ticket[2][7]:''}</td>
        <td style="border:3px #005b9c solid;height:38px;width:38px;">${ticket[2][8]?ticket[2][8]:''}</td>
      </tr>
   </table>
  </div>
  `
  // const output = `
  // <h3>Here are your cards Mr. ${req.body.name}</h3>
  // <img src="${req.body.card1.image}" height="200px"></img>
  // <img src="${req.body.card2.image}" height="200px"></img>
  // `;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'automated.game.mailer@gmail.com',
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  // let transporter = nodemailer.createTransport({
  //   service: 'gmail',

  //   auth: {
  //     user: 'automated.game.mailer@gmail.com',
  //     pass: 'automatedGameMailer'
  //   }

  // });

  // setup email data with unicode symbols
  let mailOptions = {
    from: 'Automated Mailer <automated.game.mailer@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: 'Housie Ticket', // Subject line
    text: '', // plain text body
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(error);

      return console.log(error);
    }
    console.log('Message sent to: %s', req.body.name);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send('hello');
  });

});


module.exports = router;
