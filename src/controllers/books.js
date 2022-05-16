// src/controllers/books.js

const { download } = require('express/lib/response');
const { Book } = require('../models');
const { createItem, readItems, readItemById, patchItemById, deleteItemById } = require('./helper');


exports.createBook = (req, res) => {
    createItem (req, res, Book);
};

exports.readBooks = (req, res) => {
   readItems(req, res, Book);
 };
 
exports.readBookById = (req, res) => {
   readItemById(req, res, Book);
};

exports.patchBookById = (req, res) => {
   patchItemById(req, res, Book);
 };

exports.deleteBookById = async (req, res) => {
   deleteItemById(req, res, Book);
 };

