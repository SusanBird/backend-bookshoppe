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
  });
