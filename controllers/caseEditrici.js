const CaseEditrici = require('../models/caseEditrici')
const sequelize = require('../connectors/db')
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

exports.getRiviste = (req, res) => {
  const {
    params: { Id },
  } = req

  CaseEditrici.findById(Id)
    .then(casaEditrice => {
      casaEditrice
        .getRiviste()
        .then(riviste => {
          res.json(riviste)
        })
        .catch(() => {
          res.status(500).json({})
        })
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.getCasaEditrice = (req, res) => {
  const {
    params: { Id },
  } = req

  CaseEditrici.findById(Id)
    .then(casaEditrice => {
      res.json(casaEditrice)
    })
    .catch(err => {
      res.status(404).json(err)
    })
}

exports.postCasaEditrice = (req, res) => {
  const { body } = req

  CaseEditrici.create(body)
    .then(casaEditrice => {
      res.status(201).json(casaEditrice)
    })
    .catch(({ message }) => {
      res.json(message)
    })
}

exports.patchCasaEditrice = (req, res) => {
  const {
    body,
    params: { Id },
  } = req

  CaseEditrici.findById(Id)
    .then(casaEditrice => {
      casaEditrice.update(body).then(casaEditrice => {
        res.json(casaEditrice)
      })
    })
    .catch(() => {
      res.status(404)
    })
}

exports.getCaseEditrici = (req, res) => {
  const { query } = req

  if (
    Object.keys(query).every(param => {
      switch (param) {
        case 'nome':
          return true

        default:
          return false
      }
    })
  ) {
    CaseEditrici.findAll({
      where: Object.entries(query).map(([name, value]) => ({
        [toPascalCase(name)]: {
          $like: `%${capitalizeString(value)}%`,
        },
      })),
    })
      .then(caseEditrici => {
        res.json(caseEditrici)
      })
      .catch(({ message }) => {
        res.sendJson(message)
      })
  } else {
    res.status(500).json({})
  }
}

exports.deleteCasaEditrice = (req, res) => {
  const {
    params: { Id },
  } = req

  CaseEditrici.findById(Id)
    .then(casaEditrice => {
      if (casaEditrice) {
        sequelize
          .query('DELETE FROM CASA_EDITRICE WHERE "Id"=?', {
            raw: true,
            replacements: [Id],
          })
          .then(() => {
            res.status(200).json({})
          })
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
}
