const sequelize = require('../models').sequelize

const Document = sequelize.import('../models/document.js')
const Author = sequelize.import('../models/author.js')
const Number = sequelize.import('../models/number.js')
const Conference = sequelize.import('../models/conference.js')
const Periodical = sequelize.import('../models/periodical.js')
const PublishingCompany = sequelize.import('../models/publishingCompany.js')
const Organization = sequelize.import('../models/organization.js')

exports.getAuthors = ({ params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (document) {
        document
          .getAuthors({
            attributes: {
              exclude: ['created_at', 'updated_at', 'organization_id'],
            },
            include: [
              {
                model: Organization,
                attributes: {
                  exclude: ['created_at', 'updated_at'],
                },
              },
            ],
          })
          .then(authors => {
            res.json(authors)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getPeriodicalNumber = ({ params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (document) {
        document
          .getNumber({
            include: {
              model: Periodical,
              attributes: {
                exclude: ['created_at', 'updated_at', 'publishing_company_id'],
              },
              include: {
                model: PublishingCompany,
                attributes: {
                  exclude: ['created_at', 'updated_at'],
                },
              },
            },
          })
          .then(number => {
            res.json(number)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getDocument = ({ params: { id } }, res) => {
  Document.findByPk(id, {
    attributes: {
      exclude: ['conference_id', 'number_id'],
    },
    include: [
      {
        model: Author,
        through: { attributes: [] },
        attributes: {
          exclude: ['organization_id', 'created_at', 'updated_at'],
        },
        include: {
          model: Organization,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      },
      {
        model: Number,
        attributes: {
          exclude: ['created_at', 'updated_at', 'periodical_id'],
        },
        include: {
          model: Periodical,
          attributes: {
            exclude: ['created_at', 'updated_at', 'publishing_company_id'],
          },
          include: {
            model: PublishingCompany,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        },
      },
      {
        model: Conference,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
      {
        model: Document,
        attributes: { exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'] },
        through: {
          attributes: [],
          limit: 3,
        },
        as: 'citingDocuments',
        include: {
          model: Number,
          attributes: {
            exclude: ['created_at', 'updated_at', 'periodical_id'],
          },
          include: {
            model: Periodical,
            attributes: {
              exclude: ['created_at', 'updated_at', 'publishing_company_id'],
            },
            include: {
              model: PublishingCompany,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          },
        },
      },
      {
        model: Document,
        attributes: { exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'] },
        through: {
          limit: 3,
          attributes: [],
        },
        as: 'citedDocuments',
        include: {
          model: Number,
          attributes: {
            exclude: ['created_at', 'updated_at', 'periodical_id'],
          },
          include: {
            model: Periodical,
            attributes: {
              exclude: ['created_at', 'updated_at', 'publishing_company_id'],
            },
            include: {
              model: PublishingCompany,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          },
        },
      },
    ],
  })
    .then(document => {
      if (document) {
        res.json(document)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConference = ({ params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (document) {
        document
          .getConference()
          .then(conference => res.json(conference))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createDocument = ({ body }, res) => {
  Document.create(body)
    .then(document => {
      res.status(201).json(document)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateDocument = ({ body, params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (document) {
        document
          .update(body)
          .then(document => {
            res.json(document)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getDocuments = (req, res) => {
  Document.findAll({
    attributes: {
      exclude: ['number_id', 'conference_id', 'created_at', 'updated_at'],
    },
    include: [
      {
        model: Author,
        attributes: {
          exclude: ['created_at', 'updated_at', 'organization_id'],
        },
        through: { attributes: [], limit: 3 },
        include: {
          model: Organization,
          attributes: {
            exclude: ['created_at', 'updated_at'],
          },
        },
      },
      {
        model: Number,
        attributes: {
          exclude: ['created_at', 'updated_at', 'periodical_id'],
        },
        include: {
          model: Periodical,
          attributes: {
            exclude: ['created_at', 'updated_at', 'publishing_company_id'],
          },
          include: {
            model: PublishingCompany,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        },
      },
      {
        model: Conference,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
    ],
  })
    .then(documents => {
      res.json(documents)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteDocument = ({ params: { id } }, res) => {
  Document.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getCitedDocuments = ({ params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (!document) {
        res.sendStatus(404)
      } else {
        document
          .getCitedDocuments({
            attributes: {
              exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'],
            },
            include: [
              {
                model: Conference,
                attributes: {
                  exclude: ['created_at', 'updated_at'],
                },
              },
              {
                model: Number,
                attributes: {
                  exclude: ['created_at', 'updated_at', 'periodical_id'],
                },
                include: {
                  model: Periodical,
                  attributes: {
                    exclude: ['created_at', 'updated_at', 'publishing_company_id'],
                  },
                  include: {
                    model: PublishingCompany,
                    attributes: {
                      exclude: ['created_at', 'updated_at'],
                    },
                  },
                },
              },
            ],
          })
          .then(citedDocuments => {
            res.json(citedDocuments)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getCitingDocuments = ({ params: { id } }, res) => {
  Document.findByPk(id)
    .then(document => {
      if (!document) {
        res.sendStatus(404)
      } else {
        document
          .getCitingDocuments({
            attributes: {
              exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'],
            },
            include: [
              {
                model: Conference,
                attributes: {
                  exclude: ['created_at', 'updated_at'],
                },
              },
              {
                model: Number,
                attributes: {
                  exclude: ['created_at', 'updated_at', 'periodical_id'],
                },
                include: {
                  model: Periodical,
                  attributes: {
                    exclude: ['created_at', 'updated_at', 'publishing_company_id'],
                  },
                  include: {
                    model: PublishingCompany,
                    attributes: {
                      exclude: ['created_at', 'updated_at'],
                    },
                  },
                },
              },
            ],
          })
          .then(citingDocuments => {
            res.json(citingDocuments)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
