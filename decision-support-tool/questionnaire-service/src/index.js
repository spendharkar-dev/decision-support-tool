const express = require('express');
const app = express();
app.use(express.json());

// Placeholder for questionnaire logic
app.post('/questions', (req, res) => {
  const question = req.body.question;
  if (!question) {
    return res.status(400).send('Question is required');
  }
  // Here you would typically save the question to a database
  console.log('Received question:', question);
  res.status(201).send('Question received');
});

app.get('/', (req, res) => {
  res.send('Questionnaire Service is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Questionnaire Service is running on port ${PORT}`);
});
