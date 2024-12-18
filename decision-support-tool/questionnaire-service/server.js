const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
app.use(bodyParser.json());

// Endpoint to add a question
app.post('/questions', (req, res) => {
  const { question, answers } = req.body;
  const answersString = answers.join(',');
  db.run('INSERT INTO questions (question, answers) VALUES (?, ?)', [question, answersString], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Endpoint to get all questions
app.get('/questions', (req, res) => {
  db.all('SELECT * FROM questions', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

const path = require('path');

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});