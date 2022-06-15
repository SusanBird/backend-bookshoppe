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

  it('should return a single author with their info and books written', async () => {
    const res = await request(app).get('/authors/1');
    expect(res.body.authname).toEqual('Mark Twain');
    // expect(res.body.dob).toEqual('1835-11-30');
    expect(res.body.pob).toEqual('Florida, Missouri');
    expect(res.body.books[0].title).toEqual('Adventures of Huckleberry Finn');
  });

  it('POST /should add a new author', async () => {
    const res = await request(app)
      .post('/authors')
      .send({ authname: 'Robin Dunbar', dob: '1954-12-04', pob: 'Liverpool, United Kingdom', bookIds: [1, 2] });
    expect(res.body.authname).toEqual('Robin Dunbar');
  });

  afterAll(() => {
    pool.end();
  });
});


// { id: '5', title: 'Social Brain Hypothesis', released: 2007 }, { id: '6', title: 'How Religion Evolved, and Why it Persists', released: 2022 }
