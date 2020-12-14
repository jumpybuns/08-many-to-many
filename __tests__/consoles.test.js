const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Console = require('../lib/models/Console');
const Game = require('../lib/models/Game');


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

  it('GET a specific console by Id', async() => {

    await Promise.all ([
      {   
        title: 'Dynamite Cop',
        developer: 'Sega AM1' 
      },
      {   
        title: 'Space Channel 5',
        developer: 'United Artists' 
      }
    ].map(game => Game.insert(game)));

    const console = await Console.insert({
      name: '3DS',
      make: 'Nintendo',
      games: ['Space Channel 5']

    });
    const response = await request(app)
      .get(`/api/consoles/${console.id}`);
      
    expect(response.body).toEqual({
      ...console,
      games: ['Space Channel 5']
    });
  });

  it('PUT a console into the table and updates it', async() => {
    const console = await Console.insert({
      name: '3DS',
      make: 'Nintendo'
    });
    const response = await request(app)
      .put(`/api/consoles/${console.id}`)
      .send({
        name: '3DS',
        make: 'Nintega'
      });

    expect(response.body).toEqual({
      id: console.id,
      name: '3DS',
      make: 'Nintega'
    });
  });

  it('DELETE a console from the table', async() => {
    const console = await Console.insert({
      name: 'Dreamcast',
      make: 'Sega'
    });

    const response = await request(app)
      .delete(`/api/consoles/${console.id}`);
    
    expect(response.body).toEqual(console);
  });
  


});
