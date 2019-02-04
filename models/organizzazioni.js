const { INTEGER, STRING } = require('sequelize-oracle')
const db = require('../connectors/db')

const Organizzazioni = db.define('ORGANIZZAZIONE', {
  Id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nome: {
    type: STRING,
    allowNull: false,
  },
  Sede: {
    type: STRING,
    allowNull: false,
  },
})

module.exports = Organizzazioni
