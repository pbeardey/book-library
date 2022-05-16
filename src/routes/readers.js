// src/routes/readers.js

const express = require('express');

const router = express.Router();

const readersController = require('../controllers/readers');

router.get ('/', readersController.readReaders);
router.get ('/:itemId', readersController.readReaderById);
router.post ('/', readersController.createReader);
router.patch ('/:itemId', readersController.patchReaderById);
router.delete ('/:itemId', readersController.deleteReaderById);

module.exports = router;
