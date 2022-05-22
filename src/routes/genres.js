// src/routes/genres.js

const express = require('express');

const router = express.Router();

const genresController = require('../controllers/genres');

router.get ('/', genresController.readGenres);
// router.get ('/:itemId', genresController.readBookById);
router.post ('/', genresController.createGenre);
// router.patch ('/:itemId', genresController.patchBookById);
router.delete ('/:itemId', genresController.deleteGenreById);


module.exports = router;