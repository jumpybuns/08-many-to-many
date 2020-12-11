const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');
const Console = require('../lib/models/Console');



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

  it('GET all the games from consoles', async() => {
    const games = await Promise.all([
      { title: 'Dynamite Cop',
        developer: 'Sega AM1' },
      { title: 'Space Channel 5',
        developer: 'United Artists' }
    ].map(game => Game.insert(game)));

    const response = await request(app)
      .get('/api/games');

    expect(response.body).toEqual(expect.arrayContaining(games));
    expect(response.body).toHaveLength(games.length);
  });

  it('GET a specific game by id', async() => {

    const game = await Game.insert({
      title: 'Dynamite Cop',
      developer: 'Sega AM1'
      
    });
    const response = await request(app)
      .get(`/api/games/${game.id}`);

    expect(response.body).toEqual(game);
  });
});
