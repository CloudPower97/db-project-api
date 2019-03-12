'use strict'
module.exports = sequelize => {
  const Sponsorship = sequelize.define('Sponsorship', {}, {})
  Sponsorship.associate = function() {
    // associations can be defined here
  }
  return Sponsorship
}
