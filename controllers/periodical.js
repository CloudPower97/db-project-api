const db = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const Riviste = db.import('../models/periodical.js')

exports.getCasaEditrice = ({ params: { id } }, res) => {
  Riviste.findByPk(id)
    .then(rivista => {
      if (rivista) {
        rivista
          .getCasaEditrice()
          .then(casaEditrice => {
            res.json(casaEditrice)
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

exports.getRivista = ({ params: { id } }, res) => {
  Riviste.findByPk(id)
    .then(rivista => {
      if (rivista) {
        res.json(rivista)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getNumeri = ({ params: { id } }, res) => {
  Riviste.findByPk(id)
    .then(rivista => {
      if (rivista) {
        rivista
          .getNumeri()
          .then(numeri => res.json(numeri))
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

exports.postRivista = ({ body }, res) => {
  Riviste.create(body)
    .then(rivista => {
      res.status(201).json(rivista)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchRivista = ({ body, params: { id } }, res) => {
  Riviste.findByPk(id)
    .then(rivista => {
      if (rivista) {
        rivista
          .update(body)
          .then(documento => {
            res.json(documento)
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

exports.getRiviste = ({ query }, res) => {
  if (
    Object.keys(query).every(param => {
      switch (param) {
        case 'titolo':
        case 'issn':
        case 'id_casa_editrice':
        case 'id_casa_editrice_exclude':
          return true

        default:
          return false
      }
    })
  ) {
    if (Object.keys(query).includes('id_casa_editrice_exclude')) {
      db.query(
        `SELECT *
       FROM RIVISTA
       WHERE NOT "IdCasaEditrice" = ?
      `,
        {
          raw: true,
          replacements: [query.id_casa_editrice_exclude],
        }
      )
        .then(([result]) => {
          res.json(result)
        })
        .catch(() => {
          res.status(404).json({
            error: 'Not found',
          })
        })
    } else {
      Riviste.findAll({
        where: Object.entries(query).map(([name, value]) => ({
          [toPascalCase(name)]: {
            $like: `%${capitalizeString(value)}%`,
          },
        })),
      })
        .then(riviste => {
          res.status(200).json(riviste)
        })
        .catch(({ message }) => {
          res.status(404).json({ message })
        })
    }
  } else {
    res.status(500).json({})
  }
}

exports.deleteRivista = ({ params: { id } }, res) => {
  Riviste.destroy({
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
