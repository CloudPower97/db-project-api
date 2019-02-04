const db = require('../connectors/db')
const Documenti = require('./documenti')

const Citazioni = db.define('CITAZIONE', {})

Documenti.belongsToMany(Documenti, {
  as: 'DocumentiCheCitano',
  through: {
    model: Citazioni,
  },
  foreignKey: {
    name: 'IdDocCitato',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdDocCheCita',
})

Documenti.belongsToMany(Documenti, {
  as: 'DocumentiCitati',
  through: {
    model: Citazioni,
  },
  foreignKey: {
    name: 'IdDocCheCita',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdDocCitato',
})

module.exports = Citazioni
