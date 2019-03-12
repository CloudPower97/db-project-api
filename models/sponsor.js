const { capitalizeString } = require('../libs/utils')

;('use strict')
module.exports = (sequelize, { STRING }) => {
  const Sponsor = sequelize.define(
    'Sponsor',
    {
      name: {
        type: STRING,
        allowNull: false,
        unique: true,
        set(val) {
          this.setDataValue('name', capitalizeString(val))
        },
      },
    },
    {}
  )
  Sponsor.associate = function({ Conference, Sponsorship }) {
    // associations can be defined here
    Sponsor.belongsToMany(Conference, {
      through: {
        model: Sponsorship,
      },
    })
  }
  return Sponsor
}
