const sequelize = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const Sponsor = sequelize.import('../models/sponsor.js')
const Conference = sequelize.import('../models/conference.js')

exports.getConferenze = ({ params: id }, res) => {
  Sponsor.findByPk(id)
    .then(sponsor => {
      if (sponsor) {
        sponsor
          .getConferenze()
          .then(conferenze => {
            res.json(conferenze)
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

exports.getSponsor = ({ params: id }, res) => {
  Sponsor.findByPk(id, {
    include: [
      {
        model: Conference,
        limit: 3,
      },
    ],
  })
    .then(sponsor => {
      if (sponsor) {
        res.json(sponsor)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.postSponsor = ({ body }, res) => {
  Sponsor.create(body)
    .then(author => {
      res.status(201).json(author)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchSponsor = ({ body, params: id }, res) => {
  Sponsor.findByPk(id)
    .then(sponsor => {
      if (sponsor) {
        sponsor
          .update(body)
          .then(sponsor => {
            res.json(sponsor)
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

exports.getSponsors = ({ query }, res) => {
  if (
    Object.keys(query).every(param => {
      switch (param) {
        case 'nome':
          return true

        default:
          return false
      }
    })
  ) {
    Sponsor.findAll({
      where: Object.entries(query).map(([name, value]) => ({
        [toPascalCase(name)]: {
          $like: `%${capitalizeString(value)}%`,
        },
      })),
    })
      .then(sponsors => {
        res.json(sponsors)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  } else {
    res.status(400).json({})
  }
}

exports.deleteSponsor = ({ params: { id } }, res) => {
  Sponsor.destroy({
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
