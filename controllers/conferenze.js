const Conferenze = require('../models/conferenze')
const sequelize = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getSponsors = (req, res) => {
  const {
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      conferenza
        .getSponsors()
        .then(sponsors => {
          res.json(sponsors)
        })
        .catch(({ message }) => {
          res.status(404).json(message)
        })
    })
    .catch(err => {
      res.json(err)
    })
}

exports.getConferenza = (req, res) => {
  const {
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      res.json(conferenza)
    })
    .catch(err => {
      res.json(err)
    })
}

exports.getOrganizzazioni = (req, res) => {
  const {
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      conferenza
        .getOrganizzazioni()
        .then(organizzazioni => res.json(organizzazioni))
        .catch(err => res.json(err))
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.postConferenza = (req, res) => {
  const { body } = req

  Conferenze.create(body)
    .then(conferenza => {
      res.status(201).json(conferenza)
    })
    .catch(({ message }) => {
      res.status(400).json(message)
    })
}

exports.patchConferenza = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      conferenza.update(body).then(conferenza => {
        res.json(conferenza)
      })
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getDocumenti = (req, res) => {
  const {
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      conferenza
        .getDocumenti()
        .then(documenti => res.json(documenti))
        .catch(err => res.json(err))
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getConferenze = (req, res) => {
  const { query } = req

  Conferenze.findAll({
    where: Object.entries(query).map(([name, value]) => {
      if (name === 'data') {
        return {
          [toPascalCase(name)]: {
            $eq: value,
          },
        }
      } else {
        return {
          [toPascalCase(name)]: {
            $like: `%${capitalizeString(value)}%`,
          },
        }
      }
    }),
  })
    .then(conferenze => {
      res.json(conferenze)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.deleteConferenza = (req, res) => {
  const {
    params: { Id },
  } = req

  Conferenze.findById(Id)
    .then(conferenza => {
      if (conferenza) {
        sequelize
          .query('DELETE FROM CONFERENZA WHERE "Id"=?', {
            raw: true,
            replacements: [Id],
          })
          .then(({ message }) => {
            res.status(200).json(message)
          })
          .catch(({ message }) => {
            res.json(message)
          })
      }
    })
    .catch(({ message }) => {
      res.json(message)
    })
}
