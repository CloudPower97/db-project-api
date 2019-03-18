const sequelize = require('../models').sequelize

const Periodical = sequelize.import('../models/periodical.js')
const PublishingCompany = sequelize.import('../models/publishingCompany.js')
const Number = sequelize.import('../models/number.js')

exports.getPublishingCompany = ({ params: { id } }, res) => {
  Periodical.findByPk(id)
    .then(periodical => {
      if (periodical) {
        periodical
          .getPublishingCompany()
          .then(publishingCompany => {
            res.json(publishingCompany)
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

exports.getPeriodical = ({ params: { id } }, res) => {
  Periodical.findByPk(id, {
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
      {
        model: Number,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
        order: [['created_at', 'DESC']],
      },
    ],
  })
    .then(periodical => {
      if (periodical) {
        res.json(periodical)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getPeriodicalNumbers = ({ params: { id } }, res) => {
  Periodical.findByPk(id)
    .then(periodical => {
      if (periodical) {
        periodical
          .getNumbers()
          .then(numbers => res.json(numbers))
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

exports.createPeriodical = ({ body }, res) => {
  Periodical.create(body)
    .then(periodical => {
      res.status(201).json(periodical)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updatePeriodical = ({ body, params: { id } }, res) => {
  Periodical.findByPk(id)
    .then(periodical => {
      if (periodical) {
        periodical
          .update(body)
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

exports.getPeriodicals = (req, res) => {
  Periodical.findAll({
    attributes: {
      exclude: ['created_at', 'updated_at', 'publishing_company_id'],
    },
    include: [
      {
        model: PublishingCompany,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
      },
      {
        model: Number,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
        order: [['created_at', 'DESC']],
      },
    ],
  })
    .then(periodicals => {
      res.json(periodicals)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deletePeriodical = ({ params: { id } }, res) => {
  Periodical.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
