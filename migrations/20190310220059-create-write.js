'use strict'
module.exports = {
  up: queryInterface => queryInterface.createTable('Write', {}),
  down: queryInterface => queryInterface.dropTable('Write'),
}
