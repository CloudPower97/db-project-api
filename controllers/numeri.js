const Numeri = require('../models/numeri')
const db = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getNumero = (req, res) => {
  const {
    params: { Id },
  } = req

  Numeri.findById(Id)
    .then(numero => {
      res.json(numero)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.getRivista = (req, res) => {
  const {
    params: { Id },
  } = req

  Numeri.findById(Id)
    .then(numero => {
      numero
        .getRivista()
        .then(rivista => {
          let numPagine = 0

          numero
            .getDocumenti()
            .then(documenti => {
              documenti.forEach(documento => {
                numPagine += documento.NUM_PAGINE
              })

              numero = JSON.parse(JSON.stringify(numero))
              numero.Titolo = `${rivista.Titolo} - Volume ${numero.Volume}, Numero ${numero.Numero}`
              numero.NumPagine = numPagine
              numero.ISSN = rivista.ISSN

              res.json(numero)
            })
            .catch(({ message }) => {
              res.status(500).json({ message })
            })
        })
        .catch(({ message }) => {
          res.status(500).json({ message })
        })
    })
    .catch(({ message }) => {
      res.status(404).json({ message })
    })
}

exports.getArticoli = (req, res) => {
  const {
    params: { Id },
  } = req

  Numeri.findById(Id)
    .then(numero => {
      numero
        .getDocumenti()
        .then(documenti => {
          res.json(documenti)
        })
        .catch(() => {
          res.status(404)
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.postNumero = (req, res) => {
  const { body } = req

  Numeri.create(body)
    .then(numero => {
      res.status(201).json(numero)
    })
    .catch(({ message }) => {
      res.status(400).json({ message })
    })
}

exports.patchNumero = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Numeri.findById(Id)
    .then(numero => {
      numero
        .update(body)
        .then(numero => {
          res.json(numero)
        })
        .catch(({ message }) => {
          res.json({ message })
        })
    })
    .catch(() => {
      res.status(404)
    })
}

exports.getNumeri = (req, res) => {
  const { query } = req

  if (Object.keys(query).includes('id_rivista_exclude')) {
    db.query(
      `SELECT *
       FROM NUMERO
       WHERE NOT "IdRivista" = ?
      `,
      {
        raw: true,
        replacements: [query.id_rivista_exclude],
      }
    )
      .then(([result]) => {
        res.json(result)
      })
      .catch(({ message }) => {
        res.status(404).json({ message })
      })
  } else if (
    Object.keys(query).every(param => {
      switch (param) {
        case 'volume':
        case 'numero':
        case 'anno':
        case 'id_rivista':
          return true

        default:
          return false
      }
    })
  ) {
    Numeri.findAll({
      where: Object.entries(query).map(([name, value]) => ({
        [toPascalCase(name)]: {
          $like: `%${capitalizeString(value)}%`,
        },
      })),
    })
      .then(numeri => {
        res.json(numeri)
      })
      .catch(() => {
        res.status(500)
      })
  } else {
    res.status(400)
  }
}

exports.deleteNumero = (req, res) => {
  const {
    params: { Id },
  } = req

  Numeri.findById(Id)
    .then(numero => {
      if (numero) {
        db.query('DELETE FROM NUMERO WHERE "Id"=?', {
          raw: true,
          replacements: [Id],
        }).then(({ message }) => {
          res.json(message)
        })
      } else {
        res.status(404)
      }
    })
    .catch(({ message }) => {
      res.json(message)
    })
}
