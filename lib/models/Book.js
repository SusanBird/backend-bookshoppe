const pool = require('../utils/pool');

class Book {
  id;
  title;
  released;
  authors;
  
  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.authors = row.authors ?? [];
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT * from books');
    return rows.map((row) => new Book(row));
  }

  static async getBookById(id) {
    const { rows } = await pool.query(
      `select b.*,
        coalesce (
          json_agg(to_jsonb(a)) FILTER (WHERE a.id is not null), 
          '[]') as authors
      from books b
      join authors_books ab on ab.book_id = b.id
      join authors a on ab.author_id = a.id
      WHERE b.id = $1 
      group by b.id;`, [id]);
  
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, released) VALUES ($1, $2) RETURNING *',
      [title, released]
    );
    return new Book(rows[0]);
  }

  async addAuthorToBook(bookId) {
    await pool.query(
      'INSERT INTO authors_books (book_id, author_id) VALUES ($1, $2) RETURNING *',
      [bookId, this.id]
    );
    return this;
  }

}

module.exports = Book;
