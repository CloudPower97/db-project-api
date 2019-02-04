const Autori = require('../models/autori')
const db = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

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

exports.getIndiceH = (req, res) => {
  const {
    params: { ORCID },
  } = req

  Autori.findById(ORCID).then(autore => {
    autore
      .getDocumenti()
      .then(documenti => {
        const documentiCheCitano = documenti.map(documento => documento.getDocumentiCheCitano())

        Promise.all(documentiCheCitano)
          .then(citazioni => {
            res.json({
              autore,
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
      .catch(err => {
        res.status(404).json(err)
      })
  })
}

exports.getOrganizzazione = (req, res) => {
  const {
    params: { ORCID },
  } = req

  Autori.findById(ORCID)
    .then(autore => {
      autore
        .getOrganizzazione()
        .then(organizzazione => {
          res.json(organizzazione)
        })
        .catch(() => {
          res.status(500).json({})
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getDocumenti = (req, res) => {
  const {
    params: { ORCID },
  } = req

  Autori.findById(ORCID)
    .then(autore => {
      autore.getDocumenti().then(documenti => {
        res.json(documenti)
      })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getAutore = (req, res) => {
  const {
    params: { ORCID },
  } = req

  Autori.findById(ORCID)
    .then(autore => {
      if (autore) {
        res.json(autore)
      } else {
        res.status(404).json({})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}

exports.postAutore = (req, res) => {
  const { body } = req

  Autori.create(body)
    .then(autore => {
      res.status(201).json(autore)
    })
    .catch(({ message }) => {
      res.status(404).json({ message })
    })
}

exports.patchAutore = (req, res) => {
  const {
    body,
    params: { ORCID },
  } = req

  Autori.findById(ORCID).then(autore => {
    autore
      .update(body)
      .then(autore => {
        res.json(autore)
      })
      .catch(({ message }) => {
        res.json({ message })
      })
  })
}

exports.getAutori = ({ query }, res) => {
  if (Object.keys(query).includes('id_organizzazione_exclude')) {
    db.query(
      `SELECT *
       FROM AUTORE
       WHERE NOT "IdOrganizzazione" = ?
      `,
      {
        raw: true,
        replacements: [query.id_organizzazione_exclude],
      }
    )
      .then(([result]) => {
        res.json(result)
      })
      .catch(({ message }) => {
        res.status(404).json({ message })
      })
  } else {
    Autori.findAll({
      where: Object.entries(query).map(([name, value]) => {
        if (name === 'id_organizzazione') {
          if (value !== '') {
            return {
              [toPascalCase(name)]: {
                $eq: value,
              },
            }
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
      .then(autori => {
        res.json(autori)
      })
      .catch(() => {
        res.status(404).json({})
      })
  }
}

exports.deleteAutore = (req, res) => {
  const {
    params: { ORCID },
  } = req

  Autori.findById(ORCID)
    .then(() => {
      db.query('DELETE FROM AUTORE WHERE ORCID=?', {
        raw: true,
        replacements: [ORCID],
      }).then(() => {
        res.status(200).json({})
      })
    })
    .catch(err => {
      res.json(err)
    })
}
