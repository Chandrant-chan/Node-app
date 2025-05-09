const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Hello from Node.js</title>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gradient-to-r from-blue-500 to-purple-600 text-white h-screen flex items-center justify-center">
      <div class="text-center bg-white bg-opacity-10 backdrop-blur-md p-10 rounded-xl shadow-lg">
        <h1 class="text-4xl font-bold mb-4">👋 Hello from Node.js and Express!</h1>
        <p class="text-xl">Current Time:</p>
        <p id="time" class="text-3xl font-mono mt-2"></p>
      </div>

      <script>
        function updateTime() {
          const now = new Date();
          document.getElementById('time').textContent = now.toLocaleTimeString();
        }
        setInterval(updateTime, 1000);
        updateTime();
      </script>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(\`Server is running in port http://localhost:\${port}\`);
});
