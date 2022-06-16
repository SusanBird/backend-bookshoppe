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

  static async getAuthorById(id) {
    const { rows } = await pool.query(
      `select a.*,
        coalesce (
          json_agg(to_jsonb(b)) FILTER (WHERE b.id is not null), 
          '[]') as books
      from authors a
      join authors_books ab on ab.author_id = a.id
      join books b on ab.author_id = b.id
      WHERE a.id = $1 
      group by a.id;`, [id]);
  
    return new Author(rows[0]);
  }

  static async insert({ dob, pob, authname }) {
    const { rows } = await pool.query(
      'INSERT INTO authors (dob, pob, authname) VALUES ($1, $2, $3) RETURNING *',
      [dob, pob, authname]
    );
    return new Author(rows[0]);
  }

  async addBookToAuthor(authorId) {
    await pool.query(
      'INSERT INTO authors_books (book_id, author_id) VALUES ($1, $2) RETURNING *',
      [authorId, this.id]
    );
    return this;
  }

}

module.exports = Author;
