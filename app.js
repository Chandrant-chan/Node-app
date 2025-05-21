const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('<h1 style="color: blue">Hello from Node.js and Express!</h1>');
});

app.listen(port, () => {
  console.log(`Server running in port http://localhost:${port}`);
});
