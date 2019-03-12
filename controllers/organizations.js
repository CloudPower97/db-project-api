const sequelize = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const Organizzazioni = sequelize.import('../models/organization.js')

exports.getOrganizzazione = ({ params: { id } }, res) => {
  Organizzazioni.findByPk(id)
    .then(organizzazione => {
      if (organizzazione) {
        res.json(organizzazione)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConferenze = ({ params: { id } }, res) => {
  Organizzazioni.findByPk(id)
    .then(organizzazione => {
      if (organizzazione) {
        organizzazione
          .getConferenze()
          .then(conferenze => res.json(conferenze))
          .catch(err => res.json(err))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(({ error }) => {
      res.status(500).json({ error })
    })
}

exports.getAutori = ({ params: { id } }, res) => {
  Organizzazioni.findByPk(id)
    .then(organizzazione => {
      if (organizzazione) {
        organizzazione
          .getAutori()
          .then(autori => {
            res.json(autori)
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

exports.postOrganizzazione = ({ body }, res) => {
  Organizzazioni.create(body)
    .then(organizzazione => {
      res.status(201).json(organizzazione)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchOrganizzazione = ({ body, params: { id } }, res) => {
  Organizzazioni.findByPk(id)
    .then(organizzazione => {
      organizzazione
        .update(body)
        .then(organizzazione => {
          res.json(organizzazione)
        })
        .catch(error => {
          res.status(500).json(error)
        })
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getOrganizzazioni = ({ query }, res) => {
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

exports.deleteOrganizzazione = ({ params: { id } }, res) => {
  Organizzazioni.destroy({
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
