// src/routes/books.js

const express = require('express');

const router = express.Router();

const booksController = require('../controllers/books');

router.get ('/', booksController.readBooks);
router.get ('/:itemId', booksController.readBookById);
router.post ('/', booksController.createBook);
router.patch ('/:itemId', booksController.patchBookById);
router.delete ('/:itemId', booksController.deleteBookById);


module.exports = router;