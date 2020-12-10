const pool = require('../utils/pool');

module.exports = class Console {

    id;
    name;
    make;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.make = row.make;
    }

    static async insert({ name, make, games = [] }) {
      const { rows } = await pool.query(
        'INSERT INTO consoles (name, make) VALUES ($1, $2) RETURNING *',
        [name, make]
      );

      await pool.query(
        `INSERT INTO consoles_games (console_id, game_id)
            SELECT ${rows[0].id}, id FROM games WHERE title = ANY($1::text[])`,
        [games]
      );

      return new Console(rows[0]);
    
    
    }
};
