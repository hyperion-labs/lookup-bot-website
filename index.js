/* Variables ==================================================================== */
// constants
const port = process.env.PORT || 3000;

// libraries
const path = require('path');
const express = require('express');

/* Server ==================================================================== */

const app = express();
app.use(express.static(path.join(__dirname, '/src')));


app.all('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/src/home.html'));
});

app.listen(port, () => {
  console.log(`Server starting on port ${port}.`);
});
