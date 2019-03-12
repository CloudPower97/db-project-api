const sequelize = require('../models').sequelize

const Write = sequelize.import('../models/write.js')

exports.createWrite = ({ body }, res) => {
  Write.create(body)
    .then(scrittura => {
      res.status(201).json(scrittura)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateWrite = ({ body, params: { document_id, author_id } }, res) => {
  Write.update(body, {
    where: {
      document_id,
      author_id,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(() => {
      res.status(404)
    })
}

exports.deleteWrite = ({ params: { document_id, author_id } }, res) => {
  Write.destroy({
    where: {
      document_id,
      author_id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
