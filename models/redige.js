const db = require('../connectors/db')
const Autori = require('./autori')
const Documenti = require('./documenti')

const Redige = db.define('REDIGE', {})

Autori.belongsToMany(Documenti, {
  as: 'Documenti',
  through: {
    model: Redige,
  },
  foreignKey: {
    name: 'IdAutore',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdDocumento',
})

Documenti.belongsToMany(Autori, {
  as: 'Autori',
  through: {
    model: Redige,
  },
  foreignKey: {
    name: 'IdDocumento',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdAutore',
})

module.exports = Redige
