const sequelize = require('../models').sequelize
const { capitalizeString } = require('../libs/utils')
const toPascalCase = require('to-pascal-case')

const CaseEditrici = sequelize.import('../models/publishingCompany.js')

exports.getRiviste = ({ params: { id } }, res) => {
  CaseEditrici.findByPk(id)
    .then(casaEditrice => {
      if (casaEditrice) {
        casaEditrice
          .getRiviste()
          .then(riviste => {
            res.json(riviste)
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

exports.getCasaEditrice = ({ params: { id } }, res) => {
  CaseEditrici.findByPk(id)
    .then(casaEditrice => {
      if (casaEditrice) {
        res.json(casaEditrice)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.postCasaEditrice = ({ body }, res) => {
  CaseEditrici.create(body)
    .then(casaEditrice => {
      res.status(201).json(casaEditrice)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.patchCasaEditrice = ({ body, params: { id } }, res) => {
  CaseEditrici.findByPk(id)
    .then(casaEditrice => {
      if (casaEditrice) {
        casaEditrice
          .update(body)
          .then(casaEditrice => {
            res.json(casaEditrice)
          })
          .catch(error => {
            res.status(500).json(error)
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getCaseEditrici = ({ query }, res) => {
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

exports.deleteCasaEditrice = ({ params: { id } }, res) => {
  CaseEditrici.destroy({
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
