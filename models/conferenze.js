const { INTEGER, STRING, DATEONLY, NOW, VIRTUAL } = require('sequelize-oracle')
const db = require('../connectors/db')

const Conferenze = db.define('CONFERENZA', {
  Id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Edizione: {
    type: VIRTUAL,
    get() {
      return `${this.Nome} - ${new Date(this.Data).getFullYear()}`
    },
  },
  Nome: {
    type: STRING,
    allowNull: false,
  },
  Data: {
    type: DATEONLY,
    allowNull: false,
    defaultValue: NOW,
  },
  Sede: {
    type: STRING,
    allowNull: false,
  },
})

module.exports = Conferenze
