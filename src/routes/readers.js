// src/routes/readers.js

const express = require('express');
const router = express.Router();

const readersController = require('../controllers/readers');

router.post ('/', readersController.createReader);

module.exports = router;
