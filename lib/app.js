const express = require('express');
const app = express();
const Console = require('./models/Consoles');

app.use(express.json());

app.post('/api/consoles', (req, res, next) => { 
  Console
    .insert(req.body)
    .then(console => res.send(console))
    .catch(next);
});
