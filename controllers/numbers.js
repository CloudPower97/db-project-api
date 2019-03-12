const db = require('../models').sequelize
// const { capitalizeString } = require('../libs/utils')
// const toPascalCase = require('to-pascal-case')

const Numeri = db.import('../models/number.js')

exports.getNumero = ({ params: { id } }, res) => {
  Numeri.findByPk(id)
    .then(numero => {
      res.json(numero)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getRivista = ({ params: { id } }, res) => {
  Numeri.findByPk(id)
    .then(numero => {
      if (numero) {
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
                numero.Titolo = `${rivista.Titolo} - Volume ${numero.Volume}, Numero ${
                  numero.Numero
                }`
                numero.NumPagine = numPagine
                numero.ISSN = rivista.ISSN

                res.json(numero)
              })
              .catch(({ message }) => {
                res.status(500).json({ message })
              })
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

exports.getArticoli = ({ params: { id } }, res) => {
  Numeri.findByPk(id)
    .then(numero => {
      if (numero) {
        numero
          .getDocumenti()
          .then(documenti => {
            res.json(documenti)
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

exports.postNumero = ({ body }, res) => {
  Numeri.create(body)
    .then(numero => {
      res.status(201).json(numero)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchNumero = ({ body, params: { id } }, res) => {
  Numeri.findByPk(id)
    .then(numero => {
      if (numero) {
        numero
          .update(body)
          .then(numero => {
            res.json(numero)
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

exports.getNumeri = (req, res) => {
  Numeri.findAll()
    .then(numeri => {
      res.json(numeri)
    })
    .catch(error => {
      res.status(500).json(error)
    })

  // if (Object.keys(query).includes('id_rivista_exclude')) {
  //   db.query(
  //     `SELECT *
  //      FROM NUMERO
  //      WHERE NOT "IdRivista" = ?
  //     `,
  //     {
  //       raw: true,
  //       replacements: [query.id_rivista_exclude],
  //     }
  //   )
  //     .then(([result]) => {
  //       res.json(result)
  //     })
  //     .catch(({ message }) => {
  //       res.status(404).json({ message })
  //     })
  // } else if (
  //   Object.keys(query).every(param => {
  //     switch (param) {
  //       case 'volume':
  //       case 'numero':
  //       case 'anno':
  //       case 'id_rivista':
  //         return true
  //       default:
  //         return false
  //     }
  //   })
  // ) {
  //   Numeri.findAll({
  //     where: Object.entries(query).map(([name, value]) => ({
  //       [toPascalCase(name)]: {
  //         $like: `%${capitalizeString(value)}%`,
  //       },
  //     })),
  //   })
  //     .then(numeri => {
  //       res.json(numeri)
  //     })
  //     .catch(() => {
  //       res.status(500)
  //     })
  // } else {
  //   res.status(400)
  // }
}

exports.deleteNumero = ({ params: { id } }, res) => {
  Numeri.destroy({
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
