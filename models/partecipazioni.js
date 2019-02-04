const db = require('../connectors/db')
const Organizzazioni = require('./organizzazioni')
const Conferenze = require('./conferenze')

const Partecipazioni = db.define('PARTECIPAZIONE', {})

Organizzazioni.belongsToMany(Conferenze, {
  as: 'Conferenze',
  through: {
    model: Partecipazioni,
  },
  foreignKey: {
    name: 'IdOrg',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdConferenza',
})

Conferenze.belongsToMany(Organizzazioni, {
  as: 'Organizzazioni',
  through: {
    model: Partecipazioni,
  },
  foreignKey: {
    name: 'IdConferenza',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdOrg',
})

module.exports = Partecipazioni
