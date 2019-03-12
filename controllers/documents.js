const sequelize = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const Documenti = sequelize.import('../models/document.js')
const Autori = sequelize.import('../models/author.js')
const Number = sequelize.import('../models/number.js')
const Conference = sequelize.import('../models/conference.js')

exports.getCitazioni = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findByPk(Id)
    .then(documento => {
      if (documento) {
        Promise.all([documento.getDocumentiCheCitano(), documento.getDocumentiCitati()])
          .then(([docCheCitano, docCitati]) => {
            const citazioni = {
              docCitati,
              docCheCitano,
            }

            res.json(citazioni)
          })
          .catch(error => {
            res.status(500).json({ error })
          })
      } else {
        res.sendStatus(500)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getAutori = ({ params: { id } }, res) => {
  Documenti.findByPk(id)
    .then(documento => {
      if (documento) {
        documento
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

exports.getNumeroRivista = ({ params: id }, res) => {
  Documenti.findByPk(id)
    .then(documento => {
      if (documento) {
        documento
          .getNumero()
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

exports.getDocumento = ({ params: { id } }, res) => {
  Documenti.findByPk(id, {
    attributes: {
      exclude: ['conference_id'],
    },
    include: [
      {
        model: Autori,
      },
      {
        model: Number,
      },
      {
        model: Conference,
      },
    ],
  })
    .then(documento => {
      if (documento) {
        res.json(documento)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConferenza = ({ params: { id } }, res) => {
  Documenti.findByPk(id)
    .then(documento => {
      if (documento) {
        documento
          .getConferenza()
          .then(conferenza => res.json(conferenza))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.postDocumento = ({ body }, res) => {
  Documenti.create(body)
    .then(documento => {
      res.status(201).json(documento)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchDocumento = ({ body, params: { id } }, res) => {
  Documenti.findByPk(id)
    .then(documento => {
      if (documento) {
        documento
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

exports.getDocumenti = ({ query }, res) => {
  Documenti.findAll({
    where: Object.entries(query).map(([name, value]) => ({
      [toPascalCase(name)]: {
        $like: `%${capitalizeString(value)}%`,
      },
    })),
    attributes: {
      exclude: ['number_id', 'conference_id'],
    },
    include: [
      {
        model: Autori,
      },
      {
        model: Number,
      },
      {
        model: Conference,
      },
    ],
  })
    .then(documenti => {
      res.json(documenti)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteDocumento = ({ params: { id } }, res) => {
  Documenti.destroy({
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
