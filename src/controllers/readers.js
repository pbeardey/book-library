// src/controllers/readers.js

const { download } = require('express/lib/response');
const { Reader } = require('../models');

exports.createReader = async (req, res)  => {
   
   try {
      const newReader = await Reader.create(req.body);
      res.status(201).json(newReader);
   } catch (err) {
      if (err.name === "SequelizeValidationError") {
         const errMsg = err.errors[0].message;
         res.status(400).json({error:errMsg});
         //res.status(500).json(err.errors.foreach((e) => {e.message}));
      } else {
         res.sendStatus(500);
      }
   }
};

//GET all readers records
exports.readReaders = async (req, res) => {
   
   try {
      const readers = await Reader.findAll();
      res.status(200).json(readers);
   } catch(err) {
      res.status(500).json(err);
   }
};

//GET reader by Id
exports.readReaderById = async (req, res) => {
   const { readerId } = req.params;

   
   try{
      const reader = await Reader.findByPk(readerId);
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

   try{
      const [ affectedRows ] = await Reader.update(data, { where: {id: readerId} } );
      if(!affectedRows) {
         res.status(404).json({ error : "The reader could not be found." });
      } else {
         res.status(200).json(affectedRows);
      }
   } catch(err) {
      res.status(500).json(err);
   }

}

//DELETE reader by id
exports.deleteReaderById = async (req, res) => {
   const { readerId } = req.params;
   
   try{
      const  affectedRows  = await Reader.destroy( { where: {id: readerId} } );
      if(!affectedRows) {
         res.status(404).json({error: 'The reader could not be found.'});
      } else {
         res.status(204).json(affectedRows);
      }
   } catch(err) {
      res.status(500).json(err);
   }
}