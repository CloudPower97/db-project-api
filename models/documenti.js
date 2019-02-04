const { STRING, INTEGER } = require('sequelize-oracle')
const db = require('../connectors/db')
const doiRegex = require('doi-regex')
const Conferenze = require('./conferenze')

const Documenti = db.define('DOCUMENTO', {
  Id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Doi: {
    type: STRING,
    allowNull: false,
    validate: {
      isDOI(doi) {
        if (!doiRegex({ exact: true }).test(doi)) {
          throw new Error('DOI non valido')
        }
      },
    },
  },
  Titolo: {
    type: STRING,
    allowNull: false,
  },
  NumPagine: {
    type: INTEGER,
    allowNull: false,
  },
})

Documenti.belongsTo(Conferenze, {
  as: 'Conferenza',
  foreignKey: {
    name: 'IdConferenza',
    allowNull: true,
    onDelete: 'CASCADE',
  },
})

Conferenze.hasMany(Documenti, {
  as: 'Documenti',
  foreignKey: {
    name: 'IdConferenza',
    allowNull: true,
    onDelete: 'CASCADE',
  },
})

module.exports = Documenti
