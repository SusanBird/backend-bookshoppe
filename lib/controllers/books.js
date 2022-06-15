const { Router } =  require('express');
const Book = require('../models/Book');

module.exports = Router()

  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const bookId = await Book.getBookById(id);

    res.json(bookId);
  })

  .get('/', async (req, res) => {
    const books = await Book.getAll();

    res.json(books);
  })

  .post('/', async (req, res, next) => {
    try {
      const newBook = await Book.insert(req.body);
      if (req.body.authorIds) {
        await Promise.all(req.body.authorIds.map((id) => newBook.addAuthorToBook(id)));
      }
      res.json(newBook);
    } catch (e) {
      next(e);
    }
  });
