const pool = require('../utils/pool');

module.exports = class Game {
    id;
    title;
    developer;

    constructor(row) {
      this.id = row.id;
      this.title = row.title;
      this.developer = row.developer;
    }

    static async insert({ title, developer }) {
      const { rows } = await pool.query(
        'INSERT INTO games (title, developer) VALUES ($1, $2) RETURNING *',
        [title, developer]
      );
            
      return new Game(rows[0]);
    }
};
