const sequelize = require('../models').sequelize

const Citation = sequelize.import('../models/citation.js')

exports.createCitation = ({ body }, res) => {
  Citation.create(body)
    .then(citazione => {
      res.status(201).json(citazione)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.updateCitation = ({ body, params: { citing_doc_id, cited_doc_id } }, res) => {
  Citation.update(body, {
    where: {
      cited_doc_id,
      citing_doc_id,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteCitation = ({ params: { cited_doc_id, citing_doc_id } }, res) => {
  Citation.destroy({
    where: {
      citing_doc_id,
      cited_doc_id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
