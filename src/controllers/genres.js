// src/controllers/genres.js

const { download } = require('express/lib/response');
const { Genre } = require('../models');
const { createItem, readItems, readItemById, patchItemById, deleteItemById } = require('./helper');


exports.createGenre = (req, res) => {
    createItem (req, res, Genre);
};

exports.readGenres = (req, res) => {
   readItems(req, res, Genre);
 };
 
exports.readGenreById = (req, res) => {
   readItemById(req, res, Genre);
};

// exports.patchGenreById = (req, res) => {
//    patchItemById(req, res, Genre);
//  };

exports.deleteGenreById = async (req, res) => {
   deleteItemById(req, res, Genre);
 };

