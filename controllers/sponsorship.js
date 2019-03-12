const sequelize = require('../models').sequelize

const Sponsorization = sequelize.import('../models/sponsorship.js')

exports.createSponsorship = ({ body }, res) => {
  Sponsorization.create(body)
    .then(sponsorship => {
      res.status(201).json(sponsorship)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.updateSponsorship = ({ body, params: { sponsor_id, conference_id } }, res) => {
  Sponsorization.update(body, {
    where: {
      sponsor_id,
      conference_id,
    },
  })
    .then(() => {
      res.json(body)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.deleteSponsorship = ({ params: { sponsor_id, conference_id } }, res) => {
  Sponsorization.destroy({
    where: {
      sponsor_id,
      conference_id,
    },
  })
    .then(() => {
      res.sendStatus(200)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}
