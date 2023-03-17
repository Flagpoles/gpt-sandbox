// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const nbaApi = axios.create({
  baseURL: 'https://stats.nba.com/stats',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

app.get('/api/leaguegamelog', async (req, res) => {
  try {
    const response = await nbaApi.get('/leaguegamelog', { params: req.query });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'An error occurred while fetching games.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
