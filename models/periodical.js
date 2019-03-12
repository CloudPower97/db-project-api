const ISSN = require('issn')

;('use strict')
module.exports = (sequelize, { STRING, CHAR }) => {
  const Periodical = sequelize.define(
    'Periodical',
    {
      title: {
        type: STRING,
        allowNull: false,
        unique: 'UQ_Periodical',
      },
      ISSN: {
        type: CHAR(9),
        allowNull: false,
        unique: 'UQ_Periodical',
        validate: {
          isISSN(issn) {
            if (!ISSN(issn)) {
              throw new Error('Invalid ISSN')
            }
          },
        },
      },
    },
    {}
  )
  Periodical.associate = function({ Number, PublishingCompany }) {
    // associations can be defined here
    Periodical.hasMany(Number)
    Periodical.belongsTo(PublishingCompany)
  }
  return Periodical
}
