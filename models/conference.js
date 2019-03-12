'use strict'
module.exports = (sequelize, DataTypes) => {
  const Conference = sequelize.define(
    'Conference',
    {
      edition: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.Nome} - ${new Date(this.date).getFullYear()}`
        },
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: 'UQ_Conference' },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        unique: 'UQ_Conference',
      },
      location: { type: DataTypes.STRING, allowNull: false },
    },
    {}
  )
  Conference.associate = function({ Document, Partecipation, Organization, Sponsor, Sponsorship }) {
    // associations can be defined here
    Conference.hasMany(Document)
    Conference.belongsToMany(Organization, {
      through: {
        model: Partecipation,
      },
    })
    Conference.belongsToMany(Sponsor, {
      through: {
        model: Sponsorship,
      },
    })
  }
  return Conference
}
