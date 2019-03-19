'use strict'
module.exports = {
  up: queryInterface => queryInterface.createTable('Citations', {}),
  down: queryInterface => queryInterface.dropTable('Citations'),
}
