const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('author routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors with their id and name', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(4);
    const markTwain = res.body.find((author) => author.id === '1');
    expect(markTwain).toHaveProperty('authname', 'Mark Twain');
  });

  afterAll(() => {
    pool.end();
  });
});
