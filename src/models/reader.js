// src/models/reader.js
module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      validate: { notEmpty: true,}
    },
    email: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: true,
        isEmail: true,}
    },
    password: {
      type: DataTypes.STRING,
      validate: { 
        notEmpty: true,
        len: [8]}
    },
  };
  
  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
  
};