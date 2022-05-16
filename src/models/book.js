// src/models/book.js
module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            validate: {notEmpty: true}
        }, 
        author: {
            type: DataTypes.STRING,
            validate: {notEmpty: true}
        },
        genre: DataTypes.STRING,
        ISBN: DataTypes.STRING,
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
};