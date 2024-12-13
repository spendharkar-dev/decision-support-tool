const request = require('supertest');
const app = require('../src/index');

// Test suite for questionnaire service
describe('Questionnaire Service', () => {
  let questionnaireId;

  it('should create a new questionnaire (before)', async () => {
    const response = await request(app)
      .post('/questionnaires')
      .send({ type: 'before', questions: ['Q1', 'Q2'] })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('before');
    expect(response.body.questions).toEqual(['Q1', 'Q2']);
    questionnaireId = response.body.id;
  });

  it('should retrieve a questionnaire by ID', async () => {
    const response = await request(app)
      .get(`/questionnaires/${questionnaireId}`)
      .expect(200);

    expect(response.body).toHaveProperty('id', questionnaireId);
    expect(response.body.type).toBe('before');
    expect(response.body.questions).toEqual(['Q1', 'Q2']);
  });

  it('should update a questionnaire', async () => {
    const response = await request(app)
      .put(`/questionnaires/${questionnaireId}`)
      .send({ questions: ['Q1 updated', 'Q2 updated'] })
      .expect(200);

    expect(response.body.questions).toEqual(['Q1 updated', 'Q2 updated']);
  });

  it('should delete a questionnaire', async () => {
    await request(app)
      .delete(`/questionnaires/${questionnaireId}`)
      .expect(204);

    await request(app)
      .get(`/questionnaires/${questionnaireId}`)
      .expect(404);
  });

  it('should create a new questionnaire (after)', async () => {
    const response = await request(app)
      .post('/questionnaires')
      .send({ type: 'after', questions: ['Q3', 'Q4'] })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.type).toBe('after');
    expect(response.body.questions).toEqual(['Q3', 'Q4']);
  });
});