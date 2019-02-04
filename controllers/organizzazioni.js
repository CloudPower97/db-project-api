const Organizzazioni = require('../models/organizzazioni')
const sequelize = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getOrganizzazione = (req, res) => {
  const {
    params: { Id },
  } = req

  Organizzazioni.findById(Id)
    .then(organizzazione => {
      res.json(organizzazione)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getConferenze = (req, res) => {
  const {
    params: { Id },
  } = req

  Organizzazioni.findById(Id)
    .then(organizzazione => {
      organizzazione
        .getConferenze()
        .then(conferenze => res.json(conferenze))
        .catch(err => res.json(err))
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getAutori = (req, res) => {
  const {
    params: { Id },
  } = req

  Organizzazioni.findById(Id)
    .then(organizzazione => {
      organizzazione
        .getAutori()
        .then(autori => {
          res.json(autori)
        })
        .catch(() => {
          res.status(500)
        })
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.postOrganizzazione = (req, res) => {
  const { body } = req

  Organizzazioni.create(body)
    .then(organizzazione => {
      res.status(201).json(organizzazione)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.patchOrganizzazione = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Organizzazioni.findById(Id)
    .then(organizzazione => {
      organizzazione.update(body).then(organizzazione => {
        res.json(organizzazione)
      })
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getOrganizzazioni = (req, res) => {
  const { query } = req

  if (
    Object.keys(query).every(param => {
      switch (param) {
        case 'nome':
        case 'sede':
          return true

        default:
          return false
      }
    })
  ) {
    Organizzazioni.findAll({
      where: Object.entries(query).map(([name, value]) => ({
        [toPascalCase(name)]: {
          $like: `%${capitalizeString(value)}%`,
        },
      })),
    })
      .then(organizzazioni => {
        res.json(organizzazioni)
      })
      .catch(({ message }) => {
        res.json(message)
      })
  } else {
    res.status(400).json({})
  }
}

exports.deleteOrganizzazione = (req, res) => {
  const {
    params: { Id },
  } = req

  Organizzazioni.findById(Id)
    .then(organizzazione => {
      if (organizzazione) {
        sequelize
          .query('DELETE FROM ORGANIZZAZIONE WHERE "Id"=?', {
            raw: true,
            replacements: [Id],
          })
          .then(() => {
            res.status(200).json({})
          })
          .catch(({ message }) => {
            res.status(500).json({ message })
          })
      } else {
        res.status(404).json({})
      }
    })
    .catch(({ message }) => {
      res.json(message)
    })
}
