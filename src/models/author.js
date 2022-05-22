// src/models/author.js
module.exports = (connection, DataTypes) => {
    const schema = {
      author: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                args:[true],
                msg: 'A book author is required',
            },
            notEmpty: {
                args: [true],
                msg: 'A book author cannot be empty',
            },
        }
      },
    };
    
    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
    
  };