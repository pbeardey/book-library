// src/controllers/books.js

const { download } = require('express/lib/response');
const { Book } = require('../models');

exports.createBook = async (req, res) => {
    const newBook = await Book.create(req.body);

    res.status(201).json(newBook);
};

//GET all books records
exports.readBooks = async (req, res) => {
    const books = await Book.findAll();
   
    try {
       res.status(200).json(books);
    } catch(err) {
       res.status(500).json(err);
    }
 };
 
//GET book by id
exports.readBookById = async (req, res) => {
    const { bookId } = req.params;

    const book = await Book.findByPk(bookId);
 
    try{
       if(!book) {
          res.status(404).json({ error : "The book could not be found." });
       } else {
          res.status(200).json(book);
       }
    } catch(err) {
       res.status(500).json(err);
    }    
}

//PATCH book by Id
exports.patchBookById = async (req, res) => {
    const { bookId } = req.params;
    const data = req.body;
 
    const [ affectedRows ] = await Book.update(data, { where: {id: bookId} } );
    try{
       if(!affectedRows) {
          res.status(404).json({ error : "The book could not be found." });
       } else {
          res.status(200).json(affectedRows);
       }
    } catch(err) {
       res.status(500).json(err);
    }
 
 }

//DELETE book by id
exports.deleteBookById = async (req, res) => {
    const { bookId } = req.params;
    
    const  affectedRows  = await Book.destroy( { where: {id: bookId} } );
    try{
       if(!affectedRows) {
          res.status(404).json({error: 'The book could not be found.'});
       } else {
          res.status(204).json(affectedRows);
       }
    } catch(err) {
       res.status(500).json(err);
    }
 }

