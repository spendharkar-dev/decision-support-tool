const express = require('express');
const app = express();
app.use(express.json());

const { Pool } = require('pg');

const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'datastorage',
  password: 'your-password',
  port: 5432,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

// Endpoint to add a new question
app.post('/questions', (req, res) => {
  const { question, type, options } = req.body;
  if (!question || !type) {
    return res.status(400).send('Question and type are required');
  }
  pool.query('INSERT INTO questions (question, type, options) VALUES ($1, $2, $3) RETURNING *', [question, type, options], (err, result) => {
    if (err) {
      console.error('Error saving question:', err.stack);
      return res.status(500).send('Error saving question');
    }
    res.status(201).json(result.rows[0]);
  });
});

// Endpoint to submit an answer
app.post('/answers', (req, res) => {
  const { question_id, user_id, answer } = req.body;
  if (!question_id || !user_id || answer === undefined) {
    return res.status(400).send('Question ID, user ID, and answer are required');
  }
  pool.query('INSERT INTO user_responses (question_id, user_id, response) VALUES ($1, $2, $3) RETURNING *', [question_id, user_id, answer], (err, result) => {
    if (err) {
      console.error('Error saving answer:', err.stack);
      return res.status(500).send('Error saving answer');
    }
    res.status(201).json(result.rows[0]);
  });
});

app.get('/', (req, res) => {
  res.send('Questionnaire Service is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Questionnaire Service is running on port ${PORT}`);
});
