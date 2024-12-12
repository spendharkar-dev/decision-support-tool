const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Mock a middleware or function if needed
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

// Error handling middleware for testing
app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error' });
});

describe('GET /', () => {
  it('should return "Auth Service is running"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Auth Service is running');
  });

  it('should handle errors gracefully', async () => {
    app.get('/error', (req, res) => {
      throw new Error('Test Error');
    });

    const res = await request(app).get('/error');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toEqual({ error: 'Internal Server Error' });
  });
});