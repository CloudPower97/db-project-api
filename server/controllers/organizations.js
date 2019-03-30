const sequelize = require('../models').sequelize
const sqs = require('sequelize-querystring')

const Organization = sequelize.import('../models/organization.js')
const Author = sequelize.import('../models/author.js')
const Conference = sequelize.import('../models/conference.js')

exports.getOrganization = ({ params: { id } }, res) => {
  Organization.findByPk(id, {
    include: [
      {
        model: Author,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
      },
      {
        model: Conference,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
          limit: 3,
        },
      },
    ],
  })
    .then(organization => {
      if (organization) {
        res.json(organization)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConferences = ({ params: { id } }, res) => {
  Organization.findByPk(id)
    .then(organization => {
      if (organization) {
        organization
          .getConferences({
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          })
          .then(conferences => res.json(conferences))
          .catch(err => res.json(err))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(({ error }) => {
      res.status(500).json({ error })
    })
}

exports.getAuthors = ({ params: { id } }, res) => {
  Organization.findByPk(id)
    .then(organization => {
      if (organization) {
        organization
          .getAuthors({
            attributes: {
              exclude: ['created_at', 'updated_at', 'organization_id'],
            },
            include: {
              model: Organization,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          })
          .then(authors => {
            const authors_with_documents_count = authors.map(async author => {
              const documents_count = await author.countDocuments()

              let x = JSON.parse(JSON.stringify(author))

              x.documents_count = documents_count

              return x

              // return Object.assign(JSON.parse(JSON.stringify(author)), { documents_count })
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
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createOrganization = ({ body }, res) => {
  Organization.create(body)
    .then(organization => {
      res.status(201).json(organization)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateOrganization = ({ body, params: { id } }, res) => {
  Organization.findByPk(id)
    .then(organization => {
      organization
        .update(body)
        .then(organization => {
          res.json(organization)
        })
        .catch(error => {
          res.status(500).json(error)
        })
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getOrganizations = ({ query: { filter, sort } }, res) => {
  Organization.findAll({
    where: filter ? sqs.find(filter) : {},
    order: sort ? sqs.sort(sort) : [],
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
    include: [
      {
        model: Author,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
      },
      {
        model: Conference,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
          limit: 3,
        },
      },
    ],
  })
    .then(organizations => {
      res.json(organizations)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteOrganization = ({ params: { id } }, res) => {
  Organization.destroy({
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
