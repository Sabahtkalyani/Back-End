const express = require('express');
const app = express();

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let inputDate;
  if (!date) {
    inputDate = new Date();
  } else {
    inputDate = new Date(date);
  }

  if (inputDate.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  res.json({
    unix: inputDate.getTime(),
    utc: inputDate.toUTCString()
  });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
