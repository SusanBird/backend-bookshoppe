const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books with their id, title, and year released', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(6);
    const huckFinn = res.body.find((char) => char.id === '1');
    expect(huckFinn).toHaveProperty('title', 'Adventures of Huckleberry Finn');
    expect(huckFinn).toHaveProperty('released', '1884');
  });

  afterAll(() => {
    pool.end();
  });
});
