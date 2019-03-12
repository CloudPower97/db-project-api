'use strict'
module.exports = (sequelize, { STRING }) => {
  const Organization = sequelize.define(
    'Organization',
    {
      name: {
        type: STRING,
        allowNull: false,
        unique: true,
      },
      location: {
        type: STRING,
        allowNull: false,
      },
    },
    {}
  )
  Organization.associate = function({ Author, Partecipation, Conference }) {
    // associations can be defined here
    Organization.hasMany(Author)
    Organization.belongsToMany(Conference, {
      through: {
        model: Partecipation,
      },
      foreignKey: {
        name: 'organization_id',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'conference_id',
    })
  }
  return Organization
}
