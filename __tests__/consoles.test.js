const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Console = require('../lib/models/Console');

describe('console tests yall', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it('POST a console to the table', async() => {
    const response = await request(app)
      .post('/api/consoles')
      .send({
        name: 'Dreamcast',
        make: 'Sega'
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'Dreamcast',
      make: 'Sega'
    });
  });

  it('GET all the consoles from the table', async() => {
    const consoles = await Promise.all([
      { name: '3DS',
        make: 'Nintendo' },
      { name: 'Dreamcast', 
        make: 'Sega' }
    ].map(console => Console.insert(console)));

    const response = await request(app)
      .get('/api/consoles');

    expect(response.body).toEqual(expect.arrayContaining(consoles));
    expect(response.body).toHaveLength(consoles.length);
  });
  


});
