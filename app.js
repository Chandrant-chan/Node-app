const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello from Node.js and Express!');
});
//check
app.listen(port, () => {
  console.log(`Server is running in port http://localhost:${port}`);
});
