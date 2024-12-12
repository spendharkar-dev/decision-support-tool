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

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL');
  release();
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/datastorage', { useNewUrlParser: true, useUnifiedTopology: true });

const recordSchema = new mongoose.Schema({
  data: Object
});

const Record = mongoose.model('Record', recordSchema);

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const secretKey = 'your-secret-key'; // Replace with a secure key in production

app.use(expressJwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/auth'] }));

// Authentication route for obtaining a token
app.post('/auth', (req, res) => {
  const { username, password } = req.body;
  // Replace with real authentication logic
  if (username === 'user' && password === 'pass') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


// Create a new record
app.post('/records', async (req, res) => {
  try {
    const { data } = req.body;
    const result = await pool.query('INSERT INTO records (data) VALUES ($1) RETURNING *', [data]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Retrieve a record by ID
app.get('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM records WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a record by ID
app.put('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const result = await pool.query('UPDATE records SET data = $1 WHERE id = $2 RETURNING *', [data, id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a record by ID
app.delete('/records/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM records WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Record not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
