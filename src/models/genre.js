// src/models/genre.js
module.exports = (connection, DataTypes) => {
    const schema = {
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                args:[true],
                msg: 'A book genre is required so it can be created',
            },
            notEmpty: {
                args: [true],
                msg: 'A book genre is required so it can be created',
            },
        }
      },
    };
    
    return connection.define('Genre', schema);    
  };