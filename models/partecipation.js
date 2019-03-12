'use strict'
module.exports = sequelize => {
  const Partecipation = sequelize.define('Partecipation', {}, {})

  Partecipation.associate = function() {
    // associations can be defined here
  }

  return Partecipation
}
