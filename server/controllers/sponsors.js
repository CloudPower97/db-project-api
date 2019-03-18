const sequelize = require('../models').sequelize

const Sponsor = sequelize.import('../models/sponsor.js')
const Conference = sequelize.import('../models/conference.js')

exports.getConferences = ({ params: { id } }, res) => {
  Sponsor.findByPk(id)
    .then(sponsor => {
      if (sponsor) {
        sponsor
          .getConferences({
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          })
          .then(conferences => {
            res.json(conferences)
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

exports.getSponsor = ({ params: { id } }, res) => {
  Sponsor.findByPk(id, {
    include: {
      model: Conference,
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      through: {
        attributes: [],
      },
    },
  })
    .then(sponsor => {
      if (sponsor) {
        res.json(sponsor)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createSponsor = ({ body }, res) => {
  Sponsor.create(body)
    .then(author => {
      res.status(201).json(author)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateSponsor = ({ body, params: { id } }, res) => {
  Sponsor.findByPk(id)
    .then(sponsor => {
      if (sponsor) {
        sponsor
          .update(body)
          .then(sponsor => {
            res.json(sponsor)
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

exports.getSponsors = (req, res) => {
  Sponsor.findAll({
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
    include: [
      {
        model: Conference,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
        },
      },
    ],
  })
    .then(sponsors => {
      res.json(sponsors)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteSponsor = ({ params: { id } }, res) => {
  Sponsor.destroy({
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
