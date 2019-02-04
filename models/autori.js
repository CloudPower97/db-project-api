const { CHAR, STRING, VIRTUAL } = require('sequelize-oracle')
const db = require('../connectors/db')
const Organizzazioni = require('./organizzazioni')
const ORCID = require('orcid-utils')

const Autori = db.define('AUTORE', {
  ORCID: {
    type: CHAR(19),
    primaryKey: true,
    validate: {
      isORCID(orcid) {
        if (!ORCID.isValid(orcid)) {
          throw new Error('Invalid ORCID')
        }
      },
    },
  },
  Iniziali: {
    type: VIRTUAL,
    get() {
      return {
        Nome: `${this.getDataValue('Nome')}`
          .split(' ')
          .map(val => val.charAt(0))
          .join('.'),
        Cognome: `${this.getDataValue('Cognome')}`
          .split(' ')
          .map(val => val.charAt(0))
          .join('.'),
      }
    },
  },
  Nome: {
    type: STRING,
    allowNull: false,
    get() {
      return this.getDataValue('Nome')
    },
    set(val) {
      this.setDataValue('Nome', `${val.charAt(0).toUpperCase()}${val.slice(1)}`)
    },
  },
  Cognome: {
    type: STRING,
    allowNull: false,
    get() {
      return this.getDataValue('Cognome')
    },
    set(val) {
      this.setDataValue('Cognome', `${val.charAt(0).toUpperCase()}${val.slice(1)}`)
    },
  },
})

Organizzazioni.hasMany(Autori, {
  as: 'Autori',
  foreignKey: {
    name: 'IdOrganizzazione',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

Autori.belongsTo(Organizzazioni, {
  as: 'Organizzazione',
  foreignKey: {
    name: 'IdOrganizzazione',
    allowNull: false,
    onDelete: 'CASCADE',
  },
})

module.exports = Autori
