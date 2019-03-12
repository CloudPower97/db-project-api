'use strict'
module.exports = {
  up: queryInterface => queryInterface.createTable('Sponsorships', {}),
  down: queryInterface => queryInterface.dropTable('Sponsorships'),
}
