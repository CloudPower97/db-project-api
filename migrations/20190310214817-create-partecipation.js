'use strict'
module.exports = {
  up: queryInterface => queryInterface.createTable('Partecipations', {}),
  down: queryInterface => queryInterface.dropTable('Partecipations'),
}
