const request = require('supertest');
const app = require('../server');

describe('POST /api/login', () => {
  it('returns 400 when username or password is missing', async () => {
    const res = await request(app).post('/api/login').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Username and password are required');
  });

  it('returns 401 for unknown username', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'unknown', password: 'password123' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns 401 for wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'wrongpassword' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toBe('Invalid credentials');
  });

  it('returns 200 with a JWT token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe('string');
  });
});
