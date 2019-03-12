const ORCID = require('orcid-utils')

;('use strict')
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define(
    'Author',
    {
      ORCID: {
        type: DataTypes.CHAR(19),
        primaryKey: true,
        validate: {
          isORCID(orcid) {
            if (!ORCID.isValid(orcid)) {
              throw new Error('Invalid ORCID')
            }
          },
        },
      },
      initials: {
        type: DataTypes.VIRTUAL,
        get() {
          return {
            name: `${this.getDataValue('name')}`
              .split(' ')
              .map(val => val.charAt(0))
              .join('.'),
            surname: `${this.getDataValue('surname')}`
              .split(' ')
              .map(val => val.charAt(0))
              .join('.'),
          }
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('name')
        },
        set(val) {
          this.setDataValue('name', `${val.charAt(0).toUpperCase()}${val.slice(1)}`)
        },
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('surname')
        },
        set(val) {
          this.setDataValue('surname', `${val.charAt(0).toUpperCase()}${val.slice(1)}`)
        },
      },
    },
    {}
  )
  Author.associate = function({ Organization, Document, Write }) {
    // associations can be defined here
    Author.belongsTo(Organization)
    Author.belongsToMany(Document, {
      through: {
        model: Write,
      },
    })
  }
  return Author
}
