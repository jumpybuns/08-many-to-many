const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');


describe('games testing for the masses', () => {
  beforeEach(() => { 
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  afterAll(() => {
    return pool.end();
  });
    
  it('POST a game to the console table', async() => {
    const response = await request(app)
      .post('/api/games')
      .send({
        title: 'Dynamite Cop',
        developer: 'Sega AM1'
      });

    expect(response.body).toEqual({
      id: '1',
      title: 'Dynamite Cop',
      developer: 'Sega AM1'

    });
  });
});
