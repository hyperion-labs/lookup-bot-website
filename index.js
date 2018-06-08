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
app.use((req, res, next) => {
  console.log(`req received: ${req.url}`);
  next();
});
app.use(express.static(path.join(__dirname, '/src')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/index.html'));
});

app.post('/signupWaitlist', (req, res) => {
  const { email } = req.body;
  mailchimp.subscribe(email)
    .then(() => {
      res.sendFile(path.join(__dirname, '/src/views/confirmation.html'));
    })
    .catch(() => {
      res.sendFile(path.join(__dirname, '/src/views/signupError.html'));
    });
});

app.use((req, res, next) => {
  res.status(404).send('Status 404: Page not found.');
});

app.listen(port, () => {
  console.log(`Server starting on port ${port}.`);
});
