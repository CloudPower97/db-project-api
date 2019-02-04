const Sequelize = require('sequelize-oracle')
const { ORACLEDB_USER, ORACLEDB_PASSWORD, ORACLEDB_SID, ORACLEDB_HOST, ORACLEDB_PORT } = process.env

module.exports = new Sequelize(ORACLEDB_SID, ORACLEDB_USER, ORACLEDB_PASSWORD, {
  host: ORACLEDB_HOST,
  port: ORACLEDB_PORT,
  dialect: 'oracle',
  pool: {
    maxConnections: 5,
    minConnections: 0,
    maxIdleTime: 100,
  },
  define: {
    timestamps: false,
    freezeTableName: true,
  },
})
