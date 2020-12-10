const app = require('./lib/app.js');


const PORT = process.env.PORT || 7890;

app.listen(PORT, () => {
  console.log(`shhhh you're testing too loud on port ${PORT}`);
});
