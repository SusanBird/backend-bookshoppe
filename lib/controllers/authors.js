const { Router } =  require('express');
const Author = require('../models/Author');

module.exports = Router()

  .get('/', async (req, res) => {
    const books = await Author.getAll();

    res.json(books);
  })
  
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const authorId = await Author.getAuthorById(id);

    res.json(authorId);
  })

  .post('/', async (req, res, next) => {
    try {
      const newAuth = await Author.insert(req.body);
      if (req.body.bookIds) {
        await Promise.all(req.body.bookIds.map((id) => newAuth.addBookToAuthor(id)));
      }
      res.json(newAuth);
    } catch (e) {
      next(e);
    }
  });

