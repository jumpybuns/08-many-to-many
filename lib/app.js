const express = require('express');
const app = express();
const Console = require('./models/Console');
const Game = require('./models/Game');

app.use(express.json());

app.post('/api/consoles', (req, res, next) => { 
  Console
    .insert(req.body)
    .then(console => res.send(console))
    .catch(next);
});

app.post('/api/games', (req, res, next) => {
  Game
    .insert(req.body)
    .then(game => res.send(game))
    .catch(next);
});

app.get('/api/consoles', (req, res, next) => {
  Console
    .find()
    .then(consoles => res.send(consoles))
    .catch(next);
});

app.get('/api/games', (req, res, next) => {
  Game
    .find()
    .then(games => res.send(games))
    .catch(next);
});

module.exports = app;
