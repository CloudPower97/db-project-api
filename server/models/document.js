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
      foreignKey: {
        name: 'document_id',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'author_id',
    })
    Document.belongsToMany(Document, {
      as: 'citingDocuments',
      through: {
        model: Citation,
      },
      foreignKey: {
        name: 'cited_doc_id',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'citing_doc_id',
    })

    Document.belongsToMany(Document, {
      as: 'citedDocuments',
      through: {
        model: Citation,
      },
      foreignKey: {
        name: 'citing_doc_id',
        allowNull: false,
        onDelete: 'CASCADE',
      },
      otherKey: 'cited_doc_id',
    })
  }
  return Document
}
