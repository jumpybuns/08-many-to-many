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

app.get('/api/consoles/:id', (req, res, next) => {
  Console
    .findById(req.params.id)
    .then(consoles => res.send(consoles))
    .catch(next);
});

app.get('/api/games/:id', (req, res, next) => {    
  Game
    .findById(req.params.id)
    .then(games => res.send(games))
    .catch(next);
});

app.put('/api/consoles/:id', (req, res, next) => {
  Console
    .update(req.params.id, req.body)
    .then(console => res.send(console))
    .catch(next);
});

app.put('/api/games/:id', (req, res, next) => {
  Game 
    .update(req.params.id, req.body)
    .then(game => res.send(game))
    .catch(next);

});

app.delete('/api/consoles/:id', (req, res, next) => {
  Console
    .delete(req.params.id)
    .then(console => res.send(console))
    .catch(next);
});

app.delete('/api/games/:id', (res, req, next) => {
  Game
    .delete(req.params.id)
    .then(game => res.send(game))
    .catch(next);
});


module.exports = app;
