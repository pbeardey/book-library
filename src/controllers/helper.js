// src/controllers/helper.js
const { Reader } = require('../models');

const createItem = async (req, res, model) => {
    try {
       const newItem = await model.create(req.body);
       res.status(201).json(newItem);
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

const readItems = async (req, res, model) => {
    try {
        const items = await model.findAll();
        res.status(200).json(items);
     } catch(err) {
        res.status(500).json(err);
     }
};

const readItemById = async (req, res, model) => {   
    const { itemId } = req.params;
    try{
       const item = await model.findByPk(itemId);
       if(!item) {
          res.status(404).json({ error : `The ${model.name.toLowerCase()} could not be found.` });
       } else {
          res.status(200).json(item);
       }
    } catch(err) {
       res.status(500).json(err);  
    }
};

const patchItemById = async (req, res, model) => {
    const { itemId } = req.params;
    const data = req.body;
 
    try{
       const [ affectedRows ] = await model.update(data, { where: {id: itemId} } );
       if(!affectedRows) {
          res.status(404).json({ error : `The ${model.name.toLowerCase()} could not be found.` });
       } else {
          res.status(200).json(affectedRows);
       }
    } catch(err) {
       res.status(500).json(err);
    }
};

const deleteItemById = async (req, res, model) => {
    const { itemId } = req.params;
   
    try{
       const  affectedRows  = await model.destroy( { where: {id: itemId} } );
       if(!affectedRows) {
          res.status(404).json({error: `The ${model.name.toLowerCase()} could not be found.`});
       } else {
          res.status(204).json(affectedRows);
       }
    } catch(err) {
       res.status(500).json(err);
    }
};
 
module.exports = { createItem, readItems, readItemById, patchItemById, deleteItemById };