const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Todo = require('../models/Todo'); 
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');

describe('Todo API Integration Tests', () => {
  let userToken;

  beforeAll(async () => {

    await mongoose.connect('mongodb://localhost:27017/todoAppTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });

    userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  });

  afterAll(async () => {
    await Todo.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  describe('POST /todos - Create Todo', () => {
    it('should create a new todo when authorized', async () => {
      const response = await request(app)
        .post('/todos')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          title: 'Test Todo',
          description: 'This is a test todo.',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('title', 'Test Todo');
      expect(response.body).toHaveProperty('description', 'This is a test todo.');
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          title: 'Test Todo without Auth',
          description: 'This should fail due to lack of authorization.',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('GET /todos - Get all Todos', () => {
    it('should retrieve all todos for the authenticated user', async () => {
      const todo = await Todo.create({
        title: 'Existing Todo',
        description: 'This todo already exists.',
        user: jwt.decode(userToken).userId, 
      });

      const response = await request(app)
        .get('/todos')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty('title', 'Existing Todo');
    });

    it('should return 401 if the user is not authenticated', async () => {
      const response = await request(app).get('/todos');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });
});
