const sequelize = require('../models').sequelize

const Partecipation = sequelize.import('../models/partecipation.js')

exports.createPartecipation = ({ body }, res) => {
  Partecipation.create(body)
    .then(partecipazione => {
      res.status(201).json(partecipazione)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updatePartecipazione = ({ body, params: { conference_id, organization_id } }, res) => {
  Partecipation.findOne({
    where: {
      conference_id,
      organization_id,
    },
  })
    .then(partecipation => {
      if (partecipation) {
        partecipation
          .update(body)
          .then(partecipation => {
            res.json(partecipation)
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

exports.deletePartecipation = ({ params: { conference_id, organization_id } }, res) => {
  Partecipation.destroy({
    where: {
      conference_id,
      organization_id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}
