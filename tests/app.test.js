const request = require('supertest');
const app     = require('../src/app');

describe('Health Check', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('Tasks API', () => {
  test('GET /api/tasks returns array', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/tasks creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', priority: 'high' });
    expect(res.statusCode).toBe(201);
    expect(res.body.data.title).toBe('Test Task');
    expect(res.body.data.priority).toBe('high');
  });

  test('POST /api/tasks without title returns 400', async () => {
    const res = await request(app).post('/api/tasks').send({});
    expect(res.statusCode).toBe(400);
  });

  test('PUT /api/tasks/:id toggles completed', async () => {
    const res = await request(app)
      .put('/api/tasks/1')
      .send({ completed: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.completed).toBe(true);
  });

  test('DELETE /api/tasks/:id removes task', async () => {
    const res = await request(app).delete('/api/tasks/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('GET /api/tasks/:id not found returns 404', async () => {
    const res = await request(app).get('/api/tasks/9999');
    expect(res.statusCode).toBe(404);
  });
});