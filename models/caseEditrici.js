const { INTEGER, STRING } = require('sequelize-oracle')
const db = require('../connectors/db')
const Riviste = require('./riviste')

const CaseEditrici = db.define('CASA_EDITRICE', {
  Id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nome: {
    type: STRING,
    allowNull: false,
  },
})

CaseEditrici.hasMany(Riviste, {
  as: 'Riviste',
  foreignKey: {
    name: 'IdCasaEditrice',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

Riviste.belongsTo(CaseEditrici, {
  as: 'CasaEditrice',
  foreignKey: {
    name: 'IdCasaEditrice',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

module.exports = CaseEditrici
