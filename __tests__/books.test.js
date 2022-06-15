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
    expect(res.body.length).toEqual(4);
    const huckFinn = res.body.find((book) => book.id === '1');
    expect(huckFinn).toHaveProperty('title', 'Adventures of Huckleberry Finn');
    expect(huckFinn).toHaveProperty('released', 1884);
  });

  it('should return a single book with its title, year released, author id and name', async () => {
    const res = await request(app).get('/books/1');
    expect(res.body.title).toEqual('Adventures of Huckleberry Finn');
    expect(res.body.released).toEqual(1884);
    expect(res.body.authors[0].authname).toEqual('Mark Twain');
  });

  afterAll(() => {
    pool.end();
  });
});



