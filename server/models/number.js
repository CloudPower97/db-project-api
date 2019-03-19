'use strict'
module.exports = (sequelize, { STRING, INTEGER }) => {
  const Number = sequelize.define(
    'Number',
    {
      volume: {
        type: STRING,
        allowNull: false,
        unique: 'UQ_Number',
      },
      number: {
        type: INTEGER,
        allowNull: false,
        unique: 'UQ_Number',
      },
      year: {
        type: INTEGER,
        allowNull: false,
        unique: 'UQ_Number',
      },
    },
    {}
  )
  Number.associate = function({ Document, Periodical }) {
    // associations can be defined here
    Number.hasMany(Document)
    Number.belongsTo(Periodical)
  }
  return Number
}
