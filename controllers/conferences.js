const sequelize = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const Conferenze = sequelize.import('../models/conference.js')
const Document = sequelize.import('../models/document.js')
const Sponsor = sequelize.import('../models/sponsor.js')

exports.getSponsors = ({ params: { id } }, res) => {
  Conferenze.findByPk(id)
    .then(conferenza => {
      if (conferenza) {
        conferenza
          .getSponsors()
          .then(sponsors => {
            res.json(sponsors)
          })
          .catch(error => {
            res.status(500).json(error)
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getConferenza = ({ params: { id } }, res) => {
  Conferenze.findByPk(id, {
    include: [
      {
        model: Document,
      },
      {
        model: Sponsor,
      },
    ],
  })
    .then(conferenza => {
      if (conferenza) {
        res.json(conferenza)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getOrganizzazioni = ({ params: { id } }, res) => {
  Conferenze.findByPk(id)
    .then(conferenza => {
      if (conferenza) {
        conferenza
          .getOrganizzazioni()
          .then(organizzazioni => res.json(organizzazioni))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.postConferenza = ({ body }, res) => {
  Conferenze.create(body)
    .then(conferenza => {
      res.status(201).json(conferenza)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchConferenza = ({ body, params: { id } }, res) => {
  Conferenze.findByPk(id)
    .then(conferenza => {
      if (conferenza) {
        conferenza
          .update(body)
          .then(conferenza => {
            res.json(conferenza)
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

exports.getDocumenti = ({ params: { id } }, res) => {
  Conferenze.findByPk(id)
    .then(conferenza => {
      if (conferenza) {
        conferenza
          .getDocumenti()
          .then(documenti => res.json(documenti))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConferenze = ({ query }, res) => {
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
    include: [
      {
        model: Document,
        limit: 3,
      },
      {
        model: Sponsor,
      },
    ],
  })
    .then(conferenze => {
      res.json(conferenze)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteConferenza = ({ params: { id } }, res) => {
  Conferenze.destroy({
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
