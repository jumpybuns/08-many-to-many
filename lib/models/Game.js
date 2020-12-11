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

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM games'
      );

      return rows.map(row => new Game(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM games WHERE id=$1',
        [id]
      );

      if(!rows[0]) throw new Error(`Nope, no ${id}`);

      return new Game(rows[0]);
        
     
    }

    static async update(id, { title, developer }) {
      const { rows } = await pool.query(
        'UPDATE games SET title=$1 developer=$2 WHERE id=$3 RETURNING *',
        [title, developer, id]
      );

      if(!rows[0]) throw new Error(`No no no ${id} here`);

      return new Game(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM games WHERE id=$1 RETURNING*', 
        [id]
      );

      return new Game(rows[0]);
    }
};
