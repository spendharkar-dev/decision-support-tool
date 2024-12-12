const express = require('express');
const app = express();
app.use(express.json());

// Placeholder for questionnaire logic

app.get('/', (req, res) => {
  res.send('Questionnaire Service is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Questionnaire Service is running on port ${PORT}`);
});
