// src/routes/authors.js

const express = require('express');

const router = express.Router();

const authorsController = require('../controllers/authors');

router.get ('/', authorsController.readAuthors);
router.get ('/:itemId', authorsController.readAuthorById);
router.post ('/', authorsController.createAuthor);
// router.patch ('/:itemId', authorsController.patchAuthorById);
router.delete ('/:itemId', authorsController.deleteAuthorById);


module.exports = router;