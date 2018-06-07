/* Variables ==================================================================== */
// constants
const port = process.env.PORT || 3000;

// libraries
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// custom modules
const mailchimp = require('./src/api/mailchimp');

/* Server ==================================================================== */

const app = express();
app.use(express.static(path.join(__dirname, '/src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`req received: ${req.url}`);
  next();
});
app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/home.html'));
});

app.post('/signupWaitlist', (req, res) => {
  const { email } = req.body;
  mailchimp.subscribe(email)
    .then(() => {
      res.send('Worked!');
    })
    .catch((err) => {
      res.send('Didnt work -_-');
    });
});

app.listen(port, () => {
  console.log(`Server starting on port ${port}.`);
});
