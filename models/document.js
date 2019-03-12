const doiRegex = require('doi-regex')

;('use strict')
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define(
    'Document',
    {
      DOI: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isDOI(doi) {
            if (!doiRegex({ exact: true }).test(doi)) {
              throw new Error('DOI non valido')
            }
          },
        },
      },
      title: { type: DataTypes.STRING, allowNull: false },
      number_of_pages: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  )
  Document.associate = function({ Conference, Number, Author, Write, Citation }) {
    // associations can be defined here
    Document.belongsTo(Conference)
    Document.belongsTo(Number)
    Document.belongsToMany(Author, {
      through: {
        model: Write,
      },
    })
    Document.belongsToMany(Document, {
      as: 'citing_documents',
      through: {
        model: Citation,
      },
      foreignKey: {
        name: 'id_cited_doc',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'id_doc_that_cites',
    })

    Document.belongsToMany(Document, {
      as: 'cited_documents',
      through: {
        model: Citation,
      },
      foreignKey: {
        name: 'id_doc_that_cites',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'id_cited_doc',
    })
  }
  return Document
}
