// src/controllers/authors.js

const { download } = require('express/lib/response');
const { Author } = require('../models');
const { createItem, readItems, readItemById, patchItemById, deleteItemById } = require('./helper');


exports.createAuthor = (req, res) => {
    createItem (req, res, Author);
};

exports.readAuthors = (req, res) => {
   readItems(req, res, Author);
 };
 
exports.readAuthorById = (req, res) => {
   readItemById(req, res, Author);
};

// exports.patchAuthorById = (req, res) => {
//    patchItemById(req, res, Author);
//  };

exports.deleteAuthorById = async (req, res) => {
   deleteItemById(req, res, Author);
 };

