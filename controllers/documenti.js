const Documenti = require('../models/documenti')
const sequelize = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getCitazioni = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      Promise.all([documento.getDocumentiCheCitano(), documento.getDocumentiCitati()])
        .then(([docCheCitano, docCitati]) => {
          const citazioni = {
            docCitati,
            docCheCitano,
          }

          res.json(citazioni)
        })
        .catch(() => {
          res.status(500)
        })
    })
    .catch(err => {
      res.json(err)
    })
}

exports.getAutori = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      documento
        .getAutori()
        .then(autori => {
          res.json(autori)
        })
        .catch(() => {
          res.status(404)
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getNumeroRivista = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      documento
        .getNumero()
        .then(numero => {
          res.json(numero)
        })
        .catch(() => {
          res.status(404)
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getDocumento = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      res.status(200).json(documento)
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getConferenza = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      documento
        .getConferenza()
        .then(conferenza => res.json(conferenza))
        .catch(err => res.json(err))
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.postDocumento = (req, res) => {
  const { body } = req

  Documenti.create(body)
    .then(documento => {
      res.status(201).json(documento)
    })
    .catch(({ message }) => {
      res.status(500).json({ message })
    })
}

exports.patchDocumento = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      documento
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

exports.getDocumenti = (req, res) => {
  const { query } = req

  Documenti.findAll({
    where: Object.entries(query).map(([name, value]) => ({
      [toPascalCase(name)]: {
        $like: `%${capitalizeString(value)}%`,
      },
    })),
  })
    .then(documenti => {
      res.json(documenti)
    })
    .catch(() => {
      res.status(500)
    })
}

exports.deleteDocumento = (req, res) => {
  const {
    params: { Id },
  } = req

  Documenti.findById(Id)
    .then(documento => {
      if (documento) {
        sequelize
          .query('DELETE FROM DOCUMENTO WHERE "Id"=?', {
            raw: true,
            replacements: [Id],
          })
          .then(() => {
            res.status(200).json({})
          })
          .catch(({ message }) => {
            res.status(404).json({ message })
          })
      } else {
        res.status(204).json({})
      }
    })
    .catch(({ message }) => {
      res.status(500).json({ message })
    })
}
