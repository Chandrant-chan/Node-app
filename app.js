const express = require('express');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Node.js Time App</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
      </style>
    </head>
    <body class="bg-gray-100 flex items-center justify-center h-screen">
      <div class="text-center bg-white p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h1 class="text-3xl font-bold mb-4 text-blue-600">Hello from Node.js!</h1>
        <p class="text-lg text-gray-700">Current Time:</p>
        <p id="time" class="text-2xl font-mono text-gray-900 mt-2"></p>
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
  `;
  res.send(html);
});

app.listen(port, () => {
  console.log(\`Server is running at http://localhost:\${port}\`);
});
