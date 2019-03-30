const sequelize = require('../models').sequelize
const sqs = require('sequelize-querystring')

const PublishingCompanies = sequelize.import('../models/publishingCompany.js')
const Periodical = sequelize.import('../models/periodical.js')
const Number = sequelize.import('../models/number.js')

exports.getPeriodicals = ({ params: { id } }, res) => {
  PublishingCompanies.findByPk(id)
    .then(PublishingCompany => {
      if (PublishingCompany) {
        PublishingCompany.getPeriodicals({
          attributes: {
            exclude: ['created_at', 'updated_at', 'publishing_company_id'],
          },
          include: [
            {
              model: PublishingCompanies,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
            {
              model: Number,
              limit: 3,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          ],
        })
          .then(periodicals => {
            res.json(periodicals)
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

exports.getPublishingCompany = ({ params: { id } }, res) => {
  PublishingCompanies.findByPk(id, {
    include: [
      {
        model: Periodical,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 5,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Number,
            limit: 3,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        ],
      },
    ],
  })
    .then(PublishingCompany => {
      if (PublishingCompany) {
        res.json(PublishingCompany)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createPublishingCompany = ({ body }, res) => {
  PublishingCompanies.create(body)
    .then(PublishingCompany => {
      res.status(201).json(PublishingCompany)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updatePublishingCompany = ({ body, params: { id } }, res) => {
  PublishingCompanies.findByPk(id)
    .then(PublishingCompany => {
      if (PublishingCompany) {
        PublishingCompany.update(body)
          .then(PublishingCompany => {
            res.json(PublishingCompany)
          })
          .catch(error => {
            res.status(500).json(error)
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getPublishingCompanies = ({ query: { filter, sort } }, res) => {
  PublishingCompanies.findAll({
    where: filter ? sqs.find(filter) : {},
    order: sort ? sqs.sort(sort) : [],
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
    include: [
      {
        model: Periodical,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
        order: [['created_at', 'DESC']],
        include: [
          {
            model: Number,
            limit: 3,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        ],
      },
    ],
  })
    .then(publishingCompanies => {
      res.json(publishingCompanies)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deletePublishingCompany = ({ params: { id } }, res) => {
  PublishingCompanies.destroy({
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
