const { STRING, INTEGER, CHAR } = require('sequelize-oracle')
const db = require('../connectors/db')
const ISSN = require('issn')
const Numeri = require('./numeri')

const Riviste = db.define('RIVISTA', {
  Id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Titolo: {
    type: STRING,
    allowNull: false,
  },
  Issn: {
    type: CHAR(9),
    allowNull: false,
    validate: {
      isISSN(issn) {
        if (!ISSN(issn)) {
          throw new Error('ISSN non valido')
        }
      },
    },
  },
})

Riviste.hasMany(Numeri, {
  as: 'Numeri',
  foreignKey: {
    name: 'IdRivista',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

Numeri.belongsTo(Riviste, {
  as: 'Rivista',
  foreignKey: {
    name: 'IdRivista',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

module.exports = Riviste
