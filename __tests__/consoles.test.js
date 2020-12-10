const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('console tests yall', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });

  it.only('POST a console to the table', async() => {
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


});
