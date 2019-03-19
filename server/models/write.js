'use strict'
module.exports = sequelize => {
  const Write = sequelize.define('Write', {}, {})
  Write.associate = function() {
    // associations can be defined here
  }
  return Write
}
