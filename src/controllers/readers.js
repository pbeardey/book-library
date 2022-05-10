// src/controllers/readers.js

const { download } = require('express/lib/response');
const { Reader } = require('../models');

exports.createReader = async (req, res)  => {
   const newReader = await Reader.create(req.body);

   res.status(201).json(newReader);
};

//GET all readers records
exports.readReaders = async (req, res) => {
   const readers = await Reader.findAll();
  
   try {
      res.status(200).json(readers);
   } catch(err) {
      res.status(500).json(err);
   }
};

//GET reader by Id
exports.readReaderById = async (req, res) => {
   const { readerId } = req.params;

   const reader = await Reader.findByPk(readerId);

   try{
      if(!reader) {
         res.status(404).json({ error : "The reader could not be found." });
      } else {
         res.status(200).json(reader);
      }
   } catch(err) {
      res.status(500).json(err);
   }
};

//PATCH reader by Id
exports.patchReaderById = async (req, res) => {
   const { readerId } = req.params;
   const data = req.body;

   const [ affectedRows ] = await Reader.update(data, { where: {id: readerId} } );
   try{
      if(!affectedRows) {
         res.status(404).json({ error : "The reader could not be found." });
      } else {
         res.status(200).json(affectedRows);
      }
   } catch(err) {
      res.status(500).json(err);
   }

}