const db = require('../models').sequelize
// const { capitalizeString } = require('../libs/utils')
// const toPascalCase = require('to-pascal-case')

const Autori = db.import('../models/author.js')
const Organizzazione = db.import('../models/organization.js')
const Documento = db.import('../models/document.js')

const hIndex = citations => {
  var map = {}
  var h = citations.length
  var i = 0
  var max = 0
  citations.map(c => (map[c] = map[c] ? map[c] + 1 : 1))
  for (; i <= h; i++) {
    max = Math.max(max, h >= i ? i : 0)
    h -= map[i] ? map[i] : 0
  }
  return max
}

exports.getIndiceH = ({ params: { ORCID } }, res) => {
  Autori.findByPk(ORCID)
    .then(author => {
      if (!author) {
        res.sendStatus(404)
      } else {
        author
          .getDocumenti()
          .then(documenti => {
            const documentiCheCitano = documenti.map(documento => documento.getDocumentiCheCitano())

            Promise.all(documentiCheCitano)
              .then(citazioni => {
                res.json({
                  author,
                  indiceH: hIndex(
                    JSON.parse(JSON.stringify(citazioni)).map(citazioni => citazioni.length)
                  ),
                })
              })
              .catch(({ message }) => {
                res.json({ message })
              })
          })
          .catch(({ message }) => {
            res.status(500).json(message)
          })
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.getOrganizzazione = ({ params: { ORCID } }, res) => {
  Autori.findByPk(ORCID)
    .then(author => {
      if (!author) {
        res.sendStatus(404)
      } else {
        author
          .getOrganizzazione()
          .then(organizzazione => {
            res.json(organizzazione)
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(404).json({ error })
    })
}

exports.getDocumenti = ({ params: { ORCID } }, res) => {
  Autori.findByPk(ORCID)
    .then(author => {
      if (!author) {
        res.sendStatus(404)
      } else {
        author
          .getDocumenti()
          .then(documenti => {
            res.json(documenti)
          })
          .catch(error => {
            res.status(400).json({ error })
          })
      }
    })
    .catch(error => {
      res.status(400).json(error)
    })
}

exports.getAutore = ({ params: { ORCID } }, res) => {
  Autori.findByPk(ORCID, {
    attributes: {
      exclude: ['organizzazione_id'],
    },
    include: [
      {
        model: Organizzazione,
      },
      {
        model: Documento,
        options: {
          limit: 3,
          order: [['updated_at', 'DESC']],
        },
      },
    ],
  })
    .then(author => {
      if (author) {
        res.json(author)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.postAutore = ({ body }, res) => {
  Autori.create(body)
    .then(author => {
      res.status(201).json(author)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.patchAutore = ({ body, params: { ORCID } }, res) => {
  Autori.findByPk(ORCID)
    .then(author => {
      if (author) {
        author
          .update(body)
          .then(author => {
            res.json(author)
          })
          .catch(error => {
            res.json({ error })
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
}

exports.getAutori = (req, res) => {
  Autori.findAll({
    attributes: {
      exclude: ['organization_id'],
    },
    include: [{ model: Organizzazione }],
  })
    .then(autori => {
      res.json(autori)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
  // if (Object.keys(query).includes('id_organizzazione_exclude')) {
  //   db.query(
  //     `SELECT *
  //      FROM AUTORE
  //      WHERE NOT "IdOrganizzazione" = ?
  //     `,
  //     {
  //       raw: true,
  //       replacements: [query.id_organizzazione_exclude],
  //     }
  //   )
  //     .then(([result]) => {
  //       res.json(result)
  //     })
  //     .catch(({ message }) => {
  //       res.status(404).json({ message })
  //     })
  // } else {
  //   Autori.findAll({
  //     where: Object.entries(query).map(([name, value]) => {
  //       if (name === 'id_organizzazione') {
  //         if (value !== '') {
  //           return {
  //             [toPascalCase(name)]: {
  //               $eq: value,
  //             },
  //           }
  //         }
  //       } else {
  //         return {
  //           [toPascalCase(name)]: {
  //             $like: `%${capitalizeString(value)}%`,
  //           },
  //         }
  //       }
  //     }),
  //   })
  //     .then(autori => {
  //       res.json(autori)
  //     })
  //     .catch(error => {
  //       res.status(400).json({ error })
  //     })
  // }
}

exports.deleteAutore = ({ params: { ORCID } }, res) => {
  Autori.destroy({
    where: {
      ORCID,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(400).json({ error })
    })

  // Autori.findByPk(ORCID)
  //   .then(() => {
  //     db.query('DELETE FROM AUTORE WHERE ORCID=?', {
  //       raw: true,
  //       replacements: [ORCID],
  //     }).then(() => {
  //       res.status(200).json({})
  //     })
  //   })
  //   .catch(err => {
  //     res.json(err)
  //   })
}
