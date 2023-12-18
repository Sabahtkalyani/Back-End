const express = require('express');
const path = require('path');
const app = express();

app.get('/api/:date?', (req, res) => {
  const { date } = req.params;

  let inputDate;

  try {
    if (!date) {
      inputDate = new Date();
    } else {
      inputDate = new Date(date);
    }

    if (isNaN(inputDate.getTime())) {
      throw new Error('Invalid Date');
    }

    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
