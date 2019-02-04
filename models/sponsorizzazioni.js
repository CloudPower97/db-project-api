const db = require('../connectors/db')
const Sponsors = require('./sponsors')
const Conferenze = require('./conferenze')

const Sponsorizzazioni = db.define('SPONSORIZZAZIONE', {})

Conferenze.belongsToMany(Sponsors, {
  as: 'Sponsors',
  through: {
    model: Sponsorizzazioni,
  },
  foreignKey: {
    name: 'IdConferenza',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdSponsor',
})

Sponsors.belongsToMany(Conferenze, {
  as: 'Conferenze',
  through: {
    model: Sponsorizzazioni,
  },
  foreignKey: {
    name: 'IdSponsor',
    allowNull: false,
    onDelete: 'CASCADE',
  },
  otherKey: 'IdConferenza',
})

module.exports = Sponsorizzazioni
