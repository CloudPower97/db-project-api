const sequelize = require('../models').sequelize
const sqs = require('sequelize-querystring')

const Author = sequelize.import('../models/author.js')
const Organization = sequelize.import('../models/organization.js')
const Documento = sequelize.import('../models/document.js')
const Conference = sequelize.import('../models/conference.js')
const Number = sequelize.import('../models/number.js')
const Periodical = sequelize.import('../models/periodical.js')
const PublishingCompany = sequelize.import('../models/publishingCompany.js')

const hIndex = citations => {
  var map = {}
  var h = citations.length
  var i = 0
  var max = 0
  citations.map(c => (map[c] = map[c] ? map[c] + 1 : 1))
  for (; i <= h; i++) {
    max = Math.max(max, h >= i ? i : 0)
    h -= map[i] ? map[i] : 0
  }
  return max
}

// TODO: Find a better way to handle H-Index calculation
exports.getHIndex = ({ params: { ORCID } }, res) => {
  Author.findByPk(ORCID, {
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
  })
    .then(author => {
      if (!author) {
        res.sendStatus(404)
      } else {
        author
          .getDocuments()
          .then(documents => {
            const citingDocuments = documents.map(document => document.getCitingDocuments())

            Promise.all(citingDocuments)
              .then(citations => {
                res.json({
                  author,
                  indiceH: hIndex(
                    JSON.parse(JSON.stringify(citations)).map(citazioni => citazioni.length)
                  ),
                })
              })
              .catch(({ message }) => {
                res.json({ message })
              })
          })
          .catch(({ message }) => {
            res.status(500).json(message)
          })
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.getOrganization = ({ params: { ORCID } }, res) => {
  Author.findByPk(ORCID)
    .then(author => {
      if (!author) {
        res.sendStatus(404)
      } else {
        author
          .getOrganization()
          .then(organization => {
            res.json(organization)
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(404).json({ error })
    })
}

exports.getDocuments = ({ params: { ORCID } }, res) => {
  Author.findByPk(ORCID)
    .then(author => {
      if (author) {
        author
          .getDocuments({
            attributes: {
              exclude: ['conference_id', 'number_id'],
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
                include: [
                  {
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
                ],
              },
            ],
          })
          .then(documents => {
            res.json(documents)
          })
          .catch(error => {
            res.status(500).json(error)
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.getAuthor = ({ params: { ORCID } }, res) => {
  Author.findByPk(ORCID, {
    attributes: {
      exclude: ['organization_id'],
    },
    include: [
      {
        model: Organization,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
      {
        model: Documento,
        attributes: {
          exclude: ['created_at', 'updated_at', 'number_id', 'conference_id'],
        },
        through: {
          attributes: [],
          limit: 3,
          order: [['updated_at', 'DESC']],
        },
        include: [
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
              exclude: ['created_at', 'updated_at', 'periodical_id'],
            },
          },
        ],
      },
    ],
  })
    .then(async author => {
      if (author) {
        const documents_count = await author.countDocuments()

        if (documents_count) {
          res.json({
            author,
            documents_count,
          })
        } else {
          res.status(500)
        }
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.createAuthor = ({ body }, res) => {
  Author.create(body)
    .then(author => {
      res.status(201).json(author)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.updateAuthor = ({ body, params: { ORCID } }, res) => {
  Author.findByPk(ORCID)
    .then(author => {
      if (author) {
        author
          .update(body)
          .then(author => {
            res.json(author)
          })
          .catch(error => {
            res.json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.getAuthors = (req, res) => {
  Author.findAll({
    where: req.query.filter ? sqs.find(req.query.filter) : {},
    order: req.query.sort ? sqs.sort(req.query.sort) : [],
    attributes: {
      exclude: ['organization_id', 'created_at', 'updated_at'],
    },
    include: [
      {
        model: Organization,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
      {
        model: Documento,
        attributes: {
          exclude: ['created_at', 'updated_at', 'number_id', 'conference_id'],
        },
        through: {
          limit: 3,
          attributes: [],
          order: [['updated_at', 'DESC']],
        },
        include: [
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
              exclude: ['created_at', 'updated_at', 'periodical_id'],
            },
          },
        ],
      },
    ],
  })
    .then(authors => {
      const authors_with_documents_count = authors.map(async author => {
        const documents_count = await author.countDocuments()

        return Object.assign(JSON.parse(JSON.stringify(author)), { documents_count })
      })

      Promise.all(authors_with_documents_count)
        .then(authors => {
          res.json(authors)
        })
        .catch(error => {
          res.status(500).json({ error })
        })
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteAuthor = ({ params: { ORCID } }, res) => {
  Author.destroy({
    where: {
      ORCID,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}
