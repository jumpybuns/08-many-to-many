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

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM consoles'
      );

      return rows.map(row => new Console(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT
        consoles.*,
        array_agg(games.title) AS games
        FROM
        consoles_games
        JOIN consoles
        ON consoles_games.console_id = consoles.id
        JOIN games
        ON consoles_games.game_id = games.id
        WHERE consoles.id=$1
        GROUP BY consoles.id`,
        [id]
      );

      if(!rows[0]) throw new Error(`No console found for id ${id}`);

      return {
        ...new Console(rows[0]),
        games: rows[0].games
      };
    }
};
