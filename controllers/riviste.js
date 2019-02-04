const Riviste = require('../models/riviste')
const db = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getCasaEditrice = (req, res) => {
  const {
    params: { Id },
  } = req

  Riviste.findById(Id)
    .then(rivista => {
      rivista
        .getCasaEditrice()
        .then(casaEditrice => {
          res.json(casaEditrice)
        })
        .catch(() => {
          res.status(404)
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getRivista = (req, res) => {
  const {
    params: { Id },
  } = req

  Riviste.findById(Id)
    .then(rivista => {
      res.json(rivista)
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getNumeri = (req, res) => {
  const {
    params: { Id },
  } = req

  Riviste.findById(Id)
    .then(rivista => {
      rivista
        .getNumeri()
        .then(numeri => res.json(numeri))
        .catch(err => {
          res.status(404).json(err)
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.postRivista = (req, res) => {
  const { body } = req

  Riviste.create(body)
    .then(rivista => {
      res.status(201).json(rivista)
    })
    .catch(({ message }) => {
      res.status(500).json({ message })
    })
}

exports.patchRivista = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Riviste.findById(Id)
    .then(rivista => {
      rivista
        .update(body)
        .then(documento => {
          res.json(documento)
        })
        .catch(({ message }) => {
          res.status(400).json({ message })
        })
    })
    .catch(() => {
      res.status(404)
    })
}

exports.getRiviste = (req, res) => {
  const { query } = req

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

exports.deleteRivista = (req, res) => {
  const {
    params: { Id },
  } = req

  Riviste.findById(Id)
    .then(rivista => {
      if (rivista) {
        db.query('DELETE FROM RIVISTA WHERE "Id"=?', {
          raw: true,
          replacements: [Id],
        }).then(() => {
          res.status(200).json({})
        })
      } else {
        res.status(404).json({})
      }
    })
    .catch(({ message }) => {
      res.status(500).json({ message })
    })
}
