const { STRING, INTEGER } = require('sequelize-oracle')
const db = require('../connectors/db')
const Documenti = require('./documenti')

const Numeri = db.define('NUMERO', {
  Id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Volume: {
    type: STRING,
    allowNull: false,
  },
  Numero: {
    type: INTEGER,
    allowNull: false,
  },
  Anno: {
    type: INTEGER,
    allowNull: false,
  },
})

Documenti.belongsTo(Numeri, {
  as: 'Numero',
  foreignKey: {
    name: 'IdNumeroRivista',
    allowNull: true,
    onDelete: 'CASCADE',
  },
})

Numeri.hasMany(Documenti, {
  as: 'Documenti',
  foreignKey: {
    name: 'IdNumeroRivista',
    allowNull: true,
    onDelete: 'CASCADE',
  },
})

module.exports = Numeri
