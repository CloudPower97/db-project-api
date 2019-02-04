const { INTEGER, STRING } = require('sequelize-oracle')
const db = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')

const Sponsor = db.define('SPONSOR', {
  Id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nome: {
    type: STRING,
    allowNull: false,
    set(val) {
      this.setDataValue('Nome', capitalizeString(val))
    },
  },
})

module.exports = Sponsor
