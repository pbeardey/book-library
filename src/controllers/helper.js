// src/controllers/helper.js
const { Reader, Book, Genre, Author } = require('../models');

const getOptions = (model) => {
   if (model === Book) return {include: [{model:Genre}, {model:Author}]};
   return {};
}

const removePassword = (dataObject) => {
    if (dataObject.hasOwnProperty('password')) {
        delete dataObject.password;
    }
    return dataObject;
}


const createItem = async (req, res, model) => {
    try {
       const newItem = await model.create(req.body);
       const itemWithPasswordRemoved = removePassword(newItem.dataValues);
       res.status(201).json(itemWithPasswordRemoved);
    } catch (err) {
       if (err.name === "SequelizeValidationError") {
          const errMsg = err.errors.map((e) => e.message);
          res.status(400).json({error: errMsg[0]});
       } else {
          console.log(err);
          res.sendStatus(500);
       }
    }
 };

const readItems = async (req, res, model) => {
   const options = getOptions(model);
    try {
        const items = await model.findAll(options);
        const itemsWithPasswordRemoved = items.map((e)=>removePassword(e.dataValues))
        res.status(200).json(itemsWithPasswordRemoved);
     } catch(err) {
        res.status(500).json(err);
     }
};

const readItemById = async (req, res, model) => {  
   const options = getOptions(model); 
    const { itemId } = req.params;
    try{
       const item = await model.findByPk(itemId, options);
       if(!item) {
           res.status(404).json({ error : `The ${model.name.toLowerCase()} could not be found.` });
        } else {
          const itemWithPasswordRemoved = removePassword(item.dataValues);
          res.status(200).json(itemWithPasswordRemoved);
       }
    } catch(err) {
        console.log('caught error' + err);
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
          const item = await model.findByPk(itemId);
          const itemWithPasswordRemoved = removePassword(item.dataValues); 
          res.status(200).json(itemWithPasswordRemoved);
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