const pool = require('../utils/pool');

class Author {
  id;
  authname;
  dob;
  pob;
  books;
  
  constructor(row) {
    this.id = row.id;
    this.authname = row.authname;
    this.dob = row.dob;
    this.pob = row.pob;
    this.books = row.books ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from authors');
    return rows.map((row) => new Author(row));
  }
}

module.exports = Author;
