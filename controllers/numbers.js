const sequelize = require('../models').sequelize

const Number = sequelize.import('../models/number.js')
const Document = sequelize.import('../models/document.js')
const Periodical = sequelize.import('../models/periodical.js')
const PublishingCompany = sequelize.import('../models/publishingCompany.js')
const Conference = sequelize.import('../models/conference.js')

exports.getNumber = ({ params: { id } }, res) => {
  Number.findByPk(id, {
    attributes: {
      exclude: ['periodical_id'],
    },
    include: [
      {
        model: Document,
        attributes: {
          exclude: ['created_at', 'updated_at', 'conference_id'],
        },
        limit: 3,
        order: [['updated_at', 'DESC']],
        include: [
          {
            model: Conference,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        ],
      },
      {
        model: Periodical,
        attributes: {
          exclude: ['created_at', 'updated_at', 'publishing_company_id'],
        },
        include: {
          model: PublishingCompany,
          attributes: {
            exclude: ['created_at', 'updated_at', 'publishing_company_id'],
          },
        },
      },
    ],
  })
    .then(number => {
      res.json(number)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getPeriodical = ({ params: { id } }, res) => {
  Number.findByPk(id)
    .then(number => {
      if (number) {
        number
          .getPeriodical({
            attributes: {
              exclude: ['publishing_company_id'],
            },
            include: [
              {
                model: PublishingCompany,
                attributes: {
                  exclude: ['created_at', 'updated_at'],
                },
              },
            ],
          })
          .then(periodical => {
            res.json(periodical)
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

exports.getDocuments = ({ params: { id } }, res) => {
  Number.findByPk(id)
    .then(number => {
      if (number) {
        number
          .getDocuments({
            attributes: {
              exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'],
            },
            include: [
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
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createNumber = ({ body }, res) => {
  Number.create(body)
    .then(number => {
      res.status(201).json(number)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateNumber = ({ body, params: { id } }, res) => {
  Number.findByPk(id)
    .then(number => {
      if (number) {
        number
          .update(body)
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

exports.getNumbers = (req, res) => {
  Number.findAll({
    attributes: {
      exclude: ['periodical_id', 'created_at', 'updated_at'],
    },
    include: [
      {
        model: Document,
        attributes: {
          exclude: ['created_at', 'updated_at', 'conference_id'],
        },
        limit: 3,
        order: [['updated_at', 'DESC']],
        include: [
          {
            model: Conference,
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          },
        ],
      },
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
  })
    .then(numbers => {
      res.json(numbers)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteNumber = ({ params: { id } }, res) => {
  Number.destroy({
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
