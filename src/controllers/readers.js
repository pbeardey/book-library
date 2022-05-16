// src/controllers/readers.js

const { download } = require('express/lib/response');
const { Reader } = require('../models');
const { createItem, readItems, readItemById, patchItemById, deleteItemById } = require('./helper');

exports.createReader = (req, res) => {
   createItem(req, res, Reader);
};

exports.readReaders =  (req, res) => {
   readItems (req, res, Reader);
};

exports.readReaderById =  (req, res) => {
   readItemById (req, res, Reader);
};

exports.patchReaderById =  (req, res) => {
   patchItemById (req, res, Reader);
};

exports.deleteReaderById = (req, res) => {
   deleteItemById (req, res, Reader);
};