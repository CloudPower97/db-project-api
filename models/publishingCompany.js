'use strict'
module.exports = (sequelize, DataTypes) => {
  const PublishingCompany = sequelize.define(
    'PublishingCompany',
    {
      name: { type: DataTypes.STRING, alloNull: false, unique: true },
    },
    {}
  )
  PublishingCompany.associate = function({ Periodical }) {
    // associations can be defined here
    PublishingCompany.hasMany(Periodical)
  }
  return PublishingCompany
}
