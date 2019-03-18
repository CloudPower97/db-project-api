const sequelize = require('../models').sequelize

const Conference = sequelize.import('../models/conference.js')
const Document = sequelize.import('../models/document.js')
const Sponsor = sequelize.import('../models/sponsor.js')
const Organization = sequelize.import('../models/organization.js')
const Number = sequelize.import('../models/number.js')
const Periodical = sequelize.import('../models/periodical.js')
const PublishingCompany = sequelize.import('../models/publishingCompany.js')

exports.getSponsors = ({ params: { id } }, res) => {
  Conference.findByPk(id)
    .then(conference => {
      if (conference) {
        conference
          .getSponsors({
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          })
          .then(sponsors => {
            res.json(sponsors)
          })
          .catch(error => {
            res.status(500).json(error)
          })
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.getConference = ({ params: { id } }, res) => {
  Conference.findByPk(id, {
    include: [
      {
        model: Document,
        attributes: {
          exclude: ['created_at', 'updated_at', 'number_id'],
        },
        include: {
          model: Number,
          attributes: {
            exclude: ['created_at', 'updated_at', 'periodical_id'],
          },
          include: {
            model: Periodical,
            attributes: {
              exclude: ['created_at', 'updated_at', 'publishing_company_id'],
            },
            include: {
              model: PublishingCompany,
              attributes: {
                exclude: ['created_at', 'updated_at'],
              },
            },
          },
        },
      },
      {
        model: Sponsor,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
        },
      },
      {
        model: Organization,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
          limit: 3,
        },
      },
    ],
  })
    .then(conference => {
      if (conference) {
        res.json(conference)
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getOrganizations = ({ params: { id } }, res) => {
  Conference.findByPk(id)
    .then(conference => {
      if (conference) {
        conference
          .getOrganizations({
            attributes: {
              exclude: ['created_at', 'updated_at'],
            },
          })
          .then(organizations => res.json(organizations))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.createConference = ({ body }, res) => {
  Conference.create(body)
    .then(conference => {
      res.status(201).json(conference)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.updateConference = ({ body, params: { id } }, res) => {
  Conference.findByPk(id)
    .then(conference => {
      if (conference) {
        conference
          .update(body)
          .then(conference => {
            res.json(conference)
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

exports.getDocuments = ({ params: { id } }, res) => {
  Conference.findByPk(id)
    .then(conference => {
      if (conference) {
        conference
          .getDocuments({
            attributes: {
              exclude: ['created_at', 'updated_at', 'conference_id', 'number_id'],
            },
            include: {
              model: Number,
              attributes: {
                exclude: ['created_at', 'updated_at', 'periodical_id'],
              },
              order: [['created_at', 'DESC']],
              include: {
                model: Periodical,
                attributes: {
                  exclude: ['created_at', 'updated_at', 'publishing_company_id'],
                },
                include: {
                  model: PublishingCompany,
                  attributes: {
                    exclude: ['created_at', 'updated_at'],
                  },
                },
              },
            },
          })
          .then(documents => res.json(documents))
          .catch(error => res.status(500).json({ error }))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
}

exports.getConferences = (req, res) => {
  Conference.findAll({
    attributes: {
      exclude: ['created_at', 'updated_at'],
    },
    include: [
      {
        model: Document,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        limit: 3,
        order: [['updated_at', 'DESC']],
      },
      {
        model: Sponsor,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          limit: 3,
          attributes: [],
        },
      },
      {
        model: Organization,
        attributes: {
          exclude: ['created_at', 'updated_at'],
        },
        through: {
          attributes: [],
          limit: 3,
        },
      },
    ],
  })
    .then(conferences => {
      res.json(conferences)
    })
    .catch(error => {
      res.status(500).json(error)
    })
}

exports.deleteConference = ({ params: { id } }, res) => {
  Conference.destroy({
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
