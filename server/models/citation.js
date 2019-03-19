'use strict'
module.exports = sequelize => {
  const Citation = sequelize.define('Citation', {}, {})
  Citation.associate = function() {
    // associations can be defined here
  }
  return Citation
}
