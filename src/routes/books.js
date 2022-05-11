// src/routes/books.js

const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books');

router.get ('/', booksController.readBooks);
router.get ('/:bookId', booksController.readBookById);
router.post ('/', booksController.createBook);
router.patch ('/:bookId', booksController.patchBookById);
router.delete ('/:bookId', booksController.deleteBookById);


module.exports = router;