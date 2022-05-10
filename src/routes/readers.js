// src/routes/readers.js

const express = require('express');
//const { READUNCOMMITTED } = require('sequelize/types/table-hints');
const router = express.Router();

const readersController = require('../controllers/readers');

router.get ('/', readersController.readReaders);
router.get ('/:readerId', readersController.readReaderById);
router.post ('/', readersController.createReader);
router.patch ('/:readerId', readersController.patchReaderById);


module.exports = router;
