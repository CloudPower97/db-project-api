const Sponsor = require('../models/sponsors')
const sequelize = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getConferenze = (req, res) => {
  const {
    params: { Id },
  } = req

  Sponsor.findById(Id)
    .then(sponsor => {
      sponsor
        .getConferenze()
        .then(conferenze => {
          res.json(conferenze)
        })
        .catch(({ message }) => {
          res.status(404).json({ message })
        })
    })
    .catch(({ message }) => {
      res.status(404).json({ message })
    })
}

exports.getSponsor = (req, res) => {
  const {
    params: { Id },
  } = req

  Sponsor.findById(Id)
    .then(sponsor => {
      res.json(sponsor)
    })
    .catch(() => {
      res.status(404)
    })
}

exports.postSponsor = (req, res) => {
  const { body } = req

  Sponsor.create(body)
    .then(autore => {
      res.status(200).json(autore)
    })
    .catch(({ message }) => {
      res.status(400).json({ message })
    })
}

exports.patchSponsor = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Sponsor.findById(Id)
    .then(sponsor => {
      sponsor
        .update(body)
        .then(sponsor => {
          res.json(sponsor)
        })
        .catch(() => {
          res.status(404)
        })
    })
    .catch(() => {
      res.status(404)
    })
}

exports.getSponsors = (req, res) => {
  const { query } = req

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
      .then(autori => {
        res.json(autori)
      })
      .catch(() => {
        res.status(404)
      })
  } else {
    res.status(400).json({})
  }
}

exports.deleteSponsor = (req, res) => {
  const {
    params: { Id },
  } = req

  Sponsor.findById(Id)
    .then(sponsor => {
      if (sponsor) {
        sequelize
          .query('DELETE FROM SPONSOR WHERE "Id"=?', {
            raw: true,
            replacements: [Id],
          })
          .then(() => {
            res.status(200)
          })
      } else {
        res.status(404)
      }
    })
    .catch(() => {
      res.status(500)
    })
}
